import { useContext, useEffect, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { useResumeStore } from '@/store/rootStore.ts'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import addUuidsToResume from '@/helper/addUuidsGeneric.ts'
import { HashLoader } from 'react-spinners'
import { PreviewModeContext } from '@/contexts/context.ts'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()
export default function ExtractPdf() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [extractedText, setExtractedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const resetStore = useResumeStore((state) => state.resetState)
  const deleteSection = useResumeStore((state) => state.deleteSection)
  const resumeData = useResumeStore((state) => state.resumeData)
  const { isPreviewMode } = useContext(PreviewModeContext)

  const extractText = async () => {
    if (!selectedFile) {
      setError('Please select a file first.')
      return
    }

    setIsLoading(true)
    setError(null)
    setExtractedText('')

    try {
      // @ts-ignore
      const arrayBuffer = await selectedFile?.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''

      // Get text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        // @ts-ignore
        const pageText = textContent.items.map((item) => item?.str).join(' ')
        fullText += pageText + '\n\n'
      }

      setExtractedText(fullText)
    } catch (error) {
      console.error('Error extracting text:', error)
      setError('Failed to extract text from the PDF. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    extractText().then((data) => console.log(data))
  }, [selectedFile])

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      setExtractedText('')
      setError(null)
    } else {
      setSelectedFile(null)
      setError('Please select a valid PDF file.')
    }
  }

  const fetchJSONFromExtractedPDF = async () => {
    if (!extractedText) return
    try {
      setIsLoading(true)
      const response = await fetch(
        'https://negative-bibi-resume-builder-f3b7e503.koyeb.app/get-resume-data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            textData: extractedText
          })
        }
      )

      const jsonResponse = await response.json()
      const responseKeys = Object.keys(jsonResponse)
      const dataWithUuid = addUuidsToResume(jsonResponse)

      const currentSections = resumeData.map(
        (section: any) => section.sectionKey
      )
      currentSections.forEach((sectionKey: string) => {
        if (!responseKeys.includes(sectionKey)) {
          deleteSection(sectionKey)
        }
      })

      responseKeys.forEach((key) => {
        if (jsonResponse[key].data && jsonResponse[key].data.length <= 0) {
          deleteSection(key)
        }
      })

      resetStore(dataWithUuid)
    } catch (error) {
      console.log(error)
      setError('Failed to retrieve data from PDF. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJSONFromExtractedPDF()
  }, [extractedText])

  return (
    <div className='mr-2'>
      {error && <div className='text-red-500 italic'>{error}</div>}
      {!isPreviewMode && (
        <div className='items-center gap-1.5 flex'>
          <Label htmlFor='resume'>Upload Your Resume</Label>
          <Input id='resume' type='file' onChange={handleFileChange} />
        </div>
      )}
      {isLoading && (
        <div className='fixed inset-0  z-50 bg-gray-100 opacity-85 flex justify-center items-center overflow-hidden'>
          <div>
            <div className='flex items-center justify-center gap-x-2 mb-2 font-bold'>
              <HashLoader color='green' />
              Please wait while your resume is getting uploaded and processed...
            </div>
            <div className='font-extrabold'>
              Please Note: For best results, you may need to fine-tune some of
              the details
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
