import MainLayout from '../../components/layouts/main'
import React, { useEffect } from 'react'
import Pusher from 'pusher-js'
const AboutPage = () => {
  useEffect(() => {
    // Initialize Pusher with your app key and options
    const pusher = new Pusher('718f9af2e483f5b858af', {
      cluster: 'ap1',
      // Add any additional options or configurations here
    })

    // Subscribe to the desired Pusher channel
    const channel = pusher.subscribe('imported_users')

    // Bind to the event you want to listen to
    channel.bind('imported_users', (data: any) => {
      // Handle the received event data
      console.log('Received event:', data)
      // Perform any other desired actions with the event data
    })

    // Clean up the Pusher subscription when the component unmounts
    return () => {
      channel.unbind('YOUR_EVENT_NAME')
      pusher.unsubscribe('imported_users')
    }
  }, [])
  return <MainLayout></MainLayout>
}

export default AboutPage
