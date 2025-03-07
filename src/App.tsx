import './App.css'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PreviewModeProvider from '@/providers/PreviewModeProvider.tsx'
import CreateMyResume from '@/components/editUtil/buttons/CreateMyResume.tsx'
import EditModeProvider from '@/providers/EditModeProvider.tsx'
import { Analytics } from '@vercel/analytics/react'
import HomePage from '@/pages/HomePage.tsx'
import EditorPage from '@/pages/EditorPage.tsx'
import PageTypeProvider from '@/providers/PageTypeProvider.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <PageTypeProvider>
          <EditModeProvider>
            <PreviewModeProvider>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/editor' element={<EditorPage />} />
              </Routes>
              <CreateMyResume />
            </PreviewModeProvider>
          </EditModeProvider>
        </PageTypeProvider>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App
