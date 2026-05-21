import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import Header from './Header'
import SpecialityMenu from './SpecialityMenu'
import TopDoctors from './TopDoctors'
import Banner from './Banner'
import HowItWorks from './HowItWorks'
import StatsBar from './StatsBar'

function HeroSection() {
  return (
   <>
    <Navbar/>
    <Header/>
    <SpecialityMenu/>
    <HowItWorks/>
    <TopDoctors/>
    <Banner/>
    <StatsBar/>
    <Footer/>
   </>
  )
}

export default HeroSection
