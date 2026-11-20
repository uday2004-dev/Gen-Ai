import { GoogleGenAI } from "@google/genai";
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

export async function invoke() {
    const res = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: "Hello gemini ! Explain what is Interview ?"
    })

    console.log(res.text)

}


// export const interviewReportSchema = z.object({
    
//     matchScore :z.number().describe("A scorw between 0 to 100  indicating  how well the candidate's profile  matches the job desscription  "),


//     technicalQuestions: z.array(z.object({
//         question: z.string().description("The technical question can be ask in the interview"),
//         intension: z.string().description("The intention of interviewer behind asking this questions"),
//         answer: z.string().description("How to answer this question , what poitns to cover , what approach to take etc.")
//     })).description("Technical questions that can be asked in the interview along  with their intensions and how to answer them"),

//     behavioralQuestions: z.array(z.object({
//         question: z.string().description("The technical question can be ask in the interview"),
//         intension: z.string().description("The intention of interviewer behind asking this questions"),
//         answer: z.string().description("How to answer this question , what poitns to cover , what approach to take etc.")

//     })).description("Behavioral questions that can be asked in the interview along  with their intensions and how to answer them"),


//     skillsGap: z.array(z.object({
//         skills: z.string().description("The skill which the candidate is lacking"),
//         serverity: z.enum(["low", "medium", "high"])

//     })).description("Lack of skill gaps in the candidate's profile along with their"),


//     preparationPlan: z.array(z.object({
//         day: z.number().description("The number in the preparation plan , starting from 1"),
//         focus: z.string().description("The main focus of this day in the prapration plan, e.g. data structures , system design, mock interviews e.g."),
//         task: z.array(z.string()).description("List to be task done on this day to follow the preparation plan")

//     })).description("A day-wise preparation plan for the candidate to follow on order  to prepare  for the interview effective")
// })



export const interviewReportSchema = z.object({

    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches the job description"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intension: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover and what approach to take")
    })).describe("Technical questions that can be asked in the interview along with their intentions and answers"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intension: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover and what approach to take")
    })).describe("Behavioral questions that can be asked in the interview"),

    skillsGap: z.array(z.object({
        skills: z.string().describe("The skill which the candidate is lacking"),
        serverity: z.enum(["low", "medium", "high"])
    })).describe("Skill gaps in the candidate's profile"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan"),
        task: z.array(z.string()).describe("List of tasks to be completed on this day")
    })).describe("A day-wise preparation plan for the candidate")
});



export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt =`Generate an interview report for a candidate with the following details :
    Resume:${resume},
    Self Description:${selfDescription},
    Job Descrition:${jobDescription}
    `

const res=await ai.models.generateContent({ 
    model:"gemini-3.5-flash-lite",
    contents:prompt,
    config:{
        responseMimeType:"application/json",
        responseSchema :zodToJsonSchema(interviewReportSchema)
    }
})

console.log(JSON.parse(res.text))
// const report = JSON.parse(res.text);
// return report;
const report = JSON.parse(res.text);
return report;
}

