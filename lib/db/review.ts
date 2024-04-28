"use server"

import prisma from "../prisma";
import { randomUUID } from "crypto";

// types
import { ReviewType } from "@/shared/types/review";

// Get the environment variable that identifies the user
// Make it equal a provider that could never exist if you 
// forget to set the environmental variable
const PROVIDER_ID = parseInt(process.env.PROVIDER_ID || '999', 10);

// TODO YOU CAN REUSE THIS CODE SO MUCH!!! NEED TO FIGURE THAT OUT!!!!
// YOU CAN REUSE THIS CODE SO MUCH!!! NEED TO FIGURE THAT OUT!!!!
// YOU CAN REUSE THIS CODE SO MUCH!!! NEED TO FIGURE THAT OUT!!!!
// YOU CAN REUSE THIS CODE SO MUCH!!! NEED TO FIGURE THAT OUT!!!!


// TODO The two functions below are the same thing. Put them together
export const getReviews = async (): Promise<ReviewType[]> => {
  try {

    return await prisma?.review.findMany({
      where: {
        provider_id: PROVIDER_ID,
        approved: true
      }
    });

  } catch (err) {
    console.error(err)
    return [];
  }
}

export const getFavoriteReviews = async (): Promise<ReviewType[]> => {
  try {

    return await prisma?.review.findMany({
      where: {
        provider_id: PROVIDER_ID,
        favorite: true,
        approved: true
      }
    });

  } catch (err) {
    console.error(err)
    return [];
  }
}

// A review is being left
// REMEMBRER that by default it is NOT approved!!
export const addReview = async (
  { name, rating, message }: { name: string, rating: number, message: string }
): Promise<ReviewType> => {
  try {

    const approveToken: string = randomUUID();

    return await prisma?.review.create({
      data: {
        provider_id: PROVIDER_ID,
        reviewer_name: name,
        rating: rating,
        message: message,
        approve_token: approveToken
      }
    });

  } catch (err) {
    console.error("An error occurred in the database interaction");
    throw err;
  }
}

export const getReview = async (approveToken: string): Promise<null | ReviewType> => {
  try {

    const review = await prisma?.review.findUniqueOrThrow({
      where: {
        provider_id: PROVIDER_ID,
        approve_token: approveToken
      }
    });

    return review;

  } catch (err) {
    console.error("An error occurred in the database interaction");
    console.error(err);
    return null
  }
}


export const setApproval = async (reviewId: number, approved: boolean) => {
  try {
    await prisma?.review.update({
      data: {
        approve_token: null,
        approved: approved
      },
      where: {
        id: reviewId
      }
    });
  } catch (err) {
    console.error("the error occurred in the DB interaction");
    throw err;
  }
}