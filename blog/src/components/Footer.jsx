import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">
                                    &copy; {new Date().getFullYear()}. All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-slate-500">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Features</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Pricing</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Affiliate Program</Link>
                                </li>
                                <li>
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Press Kit</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-slate-500">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Account</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Help</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Contact Us</Link>
                                </li>
                                <li>
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Customer Support</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-slate-500">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Terms &amp; Conditions</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link className="text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors" to="/">Licensing</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer