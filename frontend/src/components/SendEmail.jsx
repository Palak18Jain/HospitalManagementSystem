import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SendEmail = () => {
    const formRef = useRef();
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSending(true);

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.replace(/['",]/g, '').trim() || "service_mfmq5nv";
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.replace(/['",]/g, '').trim() || "template_82bu8lk";
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.replace(/['",]/g, '').trim() || "PVnORpGfw1LfPq0wP";

        try {
            const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: {
                    from_name: formData.name,
                    from_email: formData.email,
                    from_name: formData.name,
                    from_email: formData.email,
                    sender_name: formData.name,
                    sender_email: formData.email,
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    message_html: formData.message,
                    msg: formData.message,
                    from_message: formData.message,
                    reply_to: formData.email,
                    to_name: "Alaukik HMS Support"
                }
            });

            if (response.status === 200 || response.data === "OK") {
                toast.success("Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("EmailJS Error:", error);
            toast.error(error.response?.data || "An error occurred. Please try again later.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="w-full bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100/80">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Send Me a Message
            </h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-700 placeholder-gray-400 bg-gray-50/30"
                    />
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-700 placeholder-gray-400 bg-gray-50/30"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-700 placeholder-gray-400 bg-gray-50/30"
                    />
                </div>

                <div>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message"
                        required
                        rows="6"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-700 placeholder-gray-400 bg-gray-50/30 resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/15"
                >
                    {isSending ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                        </>
                    ) : (
                        "Send Message"
                    )}
                </button>
            </form>
        </div>
    );
};

export default SendEmail;