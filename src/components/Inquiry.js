"use client";

import React, { useState } from "react";

const Inquiry = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { firstName, email, subject, message };
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        console.log("Something went wrong");
      } else {
        resetForm();
        console.log("form submitted successfully!!!");
      }
    } catch (error) {
      console.log('There was an error submitting', error)
    }
  };

  const resetForm = () => {
    setFirstName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="first-name">First Name</label>
      <input
        type="text"
        name="first-name"
        id="first-name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="subject">Subject</label>
      <input
        type="subject"
        name="subject"
        id="subject"
        onChange={(e) => setSubject(e.target.value)}
        value={subject}
      />
      <label htmlFor="subject">Message</label>
      <input
        type="message"
        name="message"
        id="message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Inquiry;
