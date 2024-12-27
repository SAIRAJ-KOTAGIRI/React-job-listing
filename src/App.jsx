import React from 'react'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import Jobs from './pages/Jobs'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, { jobLoader } from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'
import {toast } from 'react-toastify'


const App = () => {

  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
    toast.success('Job Added Successfully')
    return
  }
  

  // Delete Job
  const deleteJob =  async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    })
    toast.success('Job Deleted Successfully')
    return
  }

  // Edit Job 
  const editJob = async (newJob) => {
    const res = await fetch(`/api/jobs/${newJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
    toast.success('Job Edited Successfully')
    return
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}/>
        <Route path='/jobs' element={<Jobs />}/>
        <Route path='/jobs/:id' element={<JobPage deleteJobSubmit={deleteJob}/>} loader={jobLoader}/>
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>}/>
        <Route path='/job/edit/:id' element={<EditJobPage editJobSubmit={editJob}/>} loader={jobLoader}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Route>
    )
  )
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App