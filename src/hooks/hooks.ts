import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../config";

export const useRemoteService = <T>(initialPath: string, initialData: T) =>{

  const [data, setData] = useState<T>(initialData);
  const [path, setPath] = useState<string>(initialPath);
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
  return {data, loading, error, setPath}
}