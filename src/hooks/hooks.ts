import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../config";

export const useRemoteService = <T>(path: string, initial: T) =>{

  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const fetchBooks = async() => {
      setError(false);
      setLoading(true);
      try{
        const res = await axios.get(`${backendUrl}${path}`);
        setData(res.data);
      } catch(e){
        setError(true);
      } finally{
        setLoading(false);
      }
      
    }
    fetchBooks()
  }, [path])
  return {data, loading, error}
}