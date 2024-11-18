"use client";

import styled from "styled-components";
import { useState } from "react";
import createNewShortenedUrl from "@/lib/createNewUrl";
import Link from "next/link";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
    height: 100vh;
    background-color: #f8f0df;
    padding: 2rem;
`;

const StyledH1 = styled.h1`
    font-size: 2.5rem;
    margin: 1rem 0;
    color: #333;
    
`;

const StyledInput = styled.input`
    font-size: 1rem;
    padding: 0.7rem 1rem;
    margin: 1rem 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;

    &::placeholder {
        font-style: italic;
        color: #aaa;
    }
`;

const StyledButton = styled.p`
    font-size: 1rem;
    font-weight: bold;
    margin-top: 5px;
    padding: 8px 15px;
    background-color: #84c7e4;
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    a {
        text-decoration: none;
    }
`;


export default function Home() {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [error, setError] = useState("");

    //Get all urls to display all shortened urls created
    // const allShortUrls = await getAllUrls();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
    
        try {
            new URL(url);
        } catch (e) {
            setError("Invalid URL");
            setLoading(false);
            return;
        }
    
        try {
            const shortenedUrl = `${window.location.origin}/${alias}`;
            const result = await createNewShortenedUrl(alias, url, shortenedUrl);
            if (result) {
                setShortenedUrl(result.shortened_url);
            } else {
                setError("Failed to create shortened URL");
            }
        } catch (e) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <StyledDiv>
        <StyledH1>Create Your Shortened URL</StyledH1>
        <StyledInput
            type="text"
            value={alias}
            placeholder="Enter Alias"
            onChange={(e) => setAlias(e.target.value)}
        />
        <StyledInput
            type="text"
            value={url}
            placeholder="Enter the url"
            onChange={(e) => setUrl(e.target.value)}
        />
        <StyledButton onClick={handleSubmit}>Submit</StyledButton>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading...</p>}
        {shortenedUrl && (
            <p>
                Success! Your shortened URL: <a href={shortenedUrl}>{shortenedUrl}</a>
            </p>
        )}
        </StyledDiv>
    );
}
