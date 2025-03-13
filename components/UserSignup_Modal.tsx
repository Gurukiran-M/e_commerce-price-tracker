"use client"
import { useEffect, useState } from "react";
import { FormEvent, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import {getUsernameByEmail} from '@/lib/actions/getUsernameByEmail'
import { Login } from '@/lib/actions/login'
import { Signup } from '@/lib/actions/signup'

const User_Modal = () => {
    let [isOpen, setIsOpen] = useState(true)
    //   const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Username, setUser] = useState('');
    const [isLogin, setLogin] = useState(true);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(false);
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const username = localStorage.getItem("username");
            setIsLocalStorageAvailable(username !== null);
        }
    }, []);

    useEffect(() => {
        if (Username) {
            localStorage.setItem("username", Username);
            console.log("Updated localStorage with Username:", Username);
            window.dispatchEvent(new Event("storage"));
        }
    }, [Username]);

    const toggleForm = () => {
        setLogin(!isLogin);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response;
        if (isLogin) {
            response = await Login(email, password);
        } else {
            response = await Signup(email, password, Username);
        }
        if (response && response.message) {
            alert(response.message);
            setMessage(response.message);
            // console.log(Username);
            if(isLogin){
                const fetchedUsername = await getUsernameByEmail(email); 
                console.log("Fetched Username:", fetchedUsername);
                if (fetchedUsername)
                    setUser(fetchedUsername);
            }
            // console.log(Username);
            else
                localStorage.setItem("username",Username);
            // console.log(localStorage.getItem("username"));
        }
        setEmail('');
        setPassword('');
        if (response.success) {
            closeModal();
        }
    }

    const openModal = () => setIsOpen(true);

    const closeModal = () => setIsOpen(false);

    return (
        !isLocalStorageAvailable  &&(
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" onClose={() => {}} className="dialog-container">
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

                                    {!isLogin && (
                                        <div className="dialog-input_container">
                                            <Image
                                                src="/assets/icons/profile-circle.svg"
                                                alt="profile"
                                                width={18}
                                                height={18}
                                            />

                                            <input
                                                required
                                                type="text"
                                                id="Username"
                                                value={Username}
                                                onChange={(e) => setUser(e.target.value)}
                                                placeholder="Enter Username"
                                                className="dialog-input"
                                            />
                                        </div>
                                    )}

                                    <div className="dialog-input_container">
                                        <Image
                                            src={showPassword ? "/assets/icons/eye.svg" : "/assets/icons/eye-closed.svg"}
                                            alt='Password'
                                            width={18}
                                            height={18}
                                            onClick={togglePasswordVisibility}
                                        />

                                        <input
                                            required
                                            type={showPassword ? "text" : "password"}
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
    );
}

export default User_Modal