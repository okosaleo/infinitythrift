import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

export default function ContactUs() {
  return (
    <div className='relative mt-24'>
        <div className="bg-[url('/img/mij.jpeg')] lg:bg-[length:100vw_100vh] bg-[length:100vw_80vh]  bg-center w-full md:h-[83vh] h-[80vh] relative">
        <div className="absolute z-10 bg-[#55371bd2] w-full md:h-[83vh] h-[80vh] py-9">
            <div className='flex flex-col gap-2'>
                <div className='flex-col flex justify-center items-center gap-2'>
                    <div className='text-text-button text-2xl font-semibold'>
                        <p>Contact Us</p>
                        </div>
                    <div className='text-text-button text-base'>
                        <p>Got Questions? We&apos;ve Got Answers</p>
                    </div>
                </div>
                <div className='flex lg:flex-row flex-col justify-center gap-4 w-full lg:px-32 px-9 py-5 '>
                    <div className='lg:w-1/2 w-full flex flex-col md:gap-10 gap-2'>
                    <div className='flex md:mt-10 mt-1'>
                        <div className='md:w-14 md:h-14 h-9 w-9 bg-[#fdca28] rounded-full flex items-center justify-center mr-3'>
                            <MapPin className='size-4'/>
                        </div>
                        <div className='flex flex-col md:gap-2 gap-0'>
                            <p className='text-base font-semibold text-text-button'>Address</p>
                            <p className='text-sm text-text-button'>Company address would be displayed here.</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='md:w-14 md:h-14 h-9 w-9 bg-[#fdca28] rounded-full flex items-center justify-center mr-3'>
                            <Phone className='size-4' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-text-button'>Phone</p>
                            <p className='text-sm text-text-button'>+23499999999</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='md:w-14 md:h-14 h-9 w-9 bg-[#fdca28] rounded-full flex items-center justify-center mr-3'>
                            <Mail className='size-4' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-base font-semibold text-text-button'>Email</p>
                            <p className='text-sm text-text-button'>Infinitythrift@email.com</p>
                        </div>
                    </div>
                    </div>
                    
                    <div className='lg:w-2/5 w-full '>
                    <Card className=' flex flex-col'>
                        <CardHeader>
                            <div className='flex items-center justify-center md:text-xl text-base  font-semibold text-content-day'>
                            <p className=''> Contact Us</p>
                            </div>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <p className='md:text-[13px] text-[10.7px]'>Enter Name</p>
                                <Input />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='md:text-[13px] text-[10.7px]'>Enter Email</p>
                                <Input />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='md:text-[13px] text-[10.7px]'>Enter Message</p>
                                <Textarea  />
                            </div>
                            <Button>Submit</Button>
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}
