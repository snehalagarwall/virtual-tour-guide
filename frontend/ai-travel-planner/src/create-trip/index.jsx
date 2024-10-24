import { Button } from '@/components/ui/button';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';

import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from 'framer-motion';
import { setDoc, doc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generatingTrip, setGeneratingTrip] = useState(false);
    const navigate=useNavigate();

    const handleInputChange = (name, value) => {
        if (name === 'noofdays' && value > 5) {
            return;
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
            GetUserProfile(tokenResponse);
        },
        onError: (error) => console.log(error)
    });

    const onGenerateTrip = async () => {
        const user = localStorage.getItem('user');

        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData.noofdays > 5 || !formData?.location || !formData?.budget || !formData?.traveler || !formData?.noofdays) {
            toast("Please fill all the details");
            return;
        }
        setGeneratingTrip(true);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noofdays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noofdays);

        console.log(FINAL_PROMPT);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        setGeneratingTrip(false);
        SaveAiTrip(result?.response?.text());
    };

    const SaveAiTrip = async (TripData) => {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();

        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/'+docId);
    }

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then((resp) => {
                console.log("User profile data:", resp.data);
                console.log("Email:", resp.data.email);
                localStorage.setItem('user', JSON.stringify(resp.data));
                setOpenDialog(false);
                onGenerateTrip();
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            });
    };

    useEffect(() => {
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAn49Zt4E_2yvTKWtxPLGcFjYfJilurNVY&libraries=places`;
            script.onload = () => setIsLoaded(true);
            document.body.appendChild(script);
        };
        loadScript();
    }, []);

    const OptionCard = ({ item, onClick, isSelected, type }) => (
        <motion.div
            onClick={onClick}
            className={`p-4 cursor-pointer rounded-lg bg-[#f0f4e1] relative overflow-hidden ${isSelected ? 'shadow-2xl' : 'hover:shadow-xl'}`}
            whileHover={{
                scale: 1.03,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                }
            }}
            whileTap={{
                scale: 0.98,
                transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 10
                }
            }}
        >
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        className="absolute inset-0 bg-green-500 opacity-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>
            <div className='text-4xl'>
                {item.icon}
            </div>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <motion.h2
                className='text-sm text-black'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                }}
            >
                {item.desc}
            </motion.h2>
        </motion.div>
    );

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-12'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Just provide some basic information, and our trip planner will generate a customised itinerary based on your preferences.
            </p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    {isLoaded ? (
                        <GooglePlacesAutocomplete
                            selectProps={{
                                place,
                                onChange: (v) => { setPlace(v); handleInputChange('location', v) }
                            }}
                        />
                    ) : (
                        <p>Loading Google Places...</p>
                    )}
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <input
                        placeholder={'Ex. 3 (max days=5)'}
                        type="number"
                        className="border border-gray-300 rounded-lg p-2 mt-2 w-full bg-white"
                        onChange={(e) => handleInputChange('noofdays', e.target.value)}
                    />
                </div>
            </div>

            <div className='mt-10'>
                <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <OptionCard
                            key={index}
                            item={item}
                            onClick={() => handleInputChange('budget', item.title)}
                            isSelected={formData?.budget === item.title}
                            type="budget"
                        />
                    ))}
                </div>
            </div>

            <div className='mt-10'>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                    {SelectTravelesList.map((item, index) => (
                        <OptionCard
                            key={index}
                            item={item}
                            onClick={() => handleInputChange('traveler', item.people)}
                            isSelected={formData?.traveler === item.people}
                            type="traveler"
                        />
                    ))}
                </div>
            </div>

            <div className='my-10 justify-end flex'>
                <Button onClick={onGenerateTrip} disabled={generatingTrip || loading} className='hover:bg-[#20881c]'>
                    {generatingTrip ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
                </Button>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" alt="Logo" />
                            <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
                            <p>Sign in to the app with Google Authentication securely</p>
                            <Button
                                onClick={login}
                                className="w-full mt-5 flex gap-4 items-center">
                                <FcGoogle className='h-7 w-7' /> Sign in with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateTrip;