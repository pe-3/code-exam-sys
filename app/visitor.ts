'use server';
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid';
 
const VISITOR_KEY = 'as-visitor';

export async function GetVisitor() {
  const cookieList = cookies();
  if (cookieList.has(VISITOR_KEY)) {
    return cookieList.get(VISITOR_KEY)?.value;
  }
}

export async function SetVisitor() {
  if(cookies().has(VISITOR_KEY)) {
    return cookies().get(VISITOR_KEY)?.value;
  }

  const visitor_id = uuidv4();
  cookies().set({
    name: VISITOR_KEY,
    value: visitor_id,
    httpOnly: true
  });

  return visitor_id;
}