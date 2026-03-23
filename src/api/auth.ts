import { data } from "react-router-dom";
import { supabase} from "../lib/supabase";

export const loginConEmail = async (email: string, pass: string) =>
{
  const { data, error} = await supabase.auth.signInWithPassword ({
    email: email, 
    password:pass,
  });


if (error) 
  {
    throw new Error("Credenciales incorrectas. Revisa tu corro y contraseña");
  }

  return data.user;

};

export const getSession = async() =>{
  const {data: {session}, error } = await supabase.auth.getSession();
  if (error) return null;
  return session;
}

export const logout = async()=>{
  const {error} = await supabase.auth.signOut();
  if (error) throw error;
};


