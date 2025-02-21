"use client"
import { useState } from "react"; 
import { FormEvent, Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { tree } from 'next/dist/build/templates/app-page'
import { Login } from '@/lib/actions/login'
import { Signup } from '@/lib/actions/signup'


const User_Modal = () => {
    let [isOpen, setIsOpen] = useState(true)
    //   const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setLogin] = useState(true);
    const [message, setMessage] = useState("");

    const toggleForm = () => {
        setLogin(!isLogin);
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response;
        if (isLogin) {
            response=await Login(email, password);
        } else {
            response = await Signup(email, password);
        }
        if (response && response.message) {
            alert(response.message);
            setMessage(response.message);
        }
        setEmail('');
        setPassword('');
        if(response.success) {
            closeModal();
        }
    }

    const openModal = () => setIsOpen(true);

    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" onClose={closeModal} className="dialog-container">
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        />

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="dialog-content">
                                {/* <div className="flex flex-col">
                                    <div className="flex justify-between">

                                        <Image
                                            src="/assets/icons/x-close.svg"
                                            alt="close"
                                            width={24}
                                            height={24}
                                            className="cursor-pointer"
                                            onClick={closeModal}
                                        />
                                    </div>
                                </div> */}

                                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                                    <span id="form-title" style={{ textAlign: "center", fontSize: "24px" }}>{isLogin ? "Login" : "Sign Up"}</span>
                                    <div className="dialog-input_container">
                                        <Image
                                            src="/assets/icons/mail.svg"
                                            alt='mail'
                                            width={18}
                                            height={18}
                                        />

                                        <input
                                            required
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className='dialog-input'
                                        />
                                    </div>

                                    <div className="dialog-input_container">
                                        <Image
                                            src="/assets/icons/mail.svg"
                                            alt='mail'
                                            width={18}
                                            height={18}
                                        />

                                        <input
                                            required
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password"
                                            className='dialog-input'
                                        />
                                    </div>

                                    <input type="hidden" name="action" value={isLogin ? "login" : "signup"} />

                                    <button type="submit"
                                        className="dialog-btn">
                                        {isLogin ? "Login" : "Sign Up"}
                                    </button>

                                </form>
                                <br></br>
                                <p>
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    <a href="#" onClick={toggleForm} style={{ marginLeft: "5px", cursor: "pointer", color: "blue" }}>
                                        {isLogin ? "Sign Up" : "Login"}
                                    </a>
                                </p>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default User_Modal