import CTA2 from '@/custom-components/deployment/Deployment'
import FooterGlow from '@/custom-components/footer/Footer'
import Header2 from '@/custom-components/header/Header'
import Hero1 from '@/custom-components/hero/Hero'

import React from 'react'

const Main = () => {
  return (
    <div>
      <Header2/>
      <div className='py-20 bg-gray-300 '>
            <Hero1/>
      </div>
      <CTA2/>
      <FooterGlow/>
    </div>
  )
}

export default Main



