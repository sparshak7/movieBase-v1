import { db } from "../services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useFireStore = () => {
  const toast = useToast();

  const addWatchList = async (userID, saveData, dataID) => {
    if (await checkWatchList(userID, dataID)) {
      toast({
        title: "This is already in watchlist.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
      return false;
    }
    try {
      await setDoc(doc(db, "users", userID, "watchlist", dataID), saveData);
      toast({
        title: "Succesfully added!",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "Saving unsuccesful. Please try again.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const addFavouritesList = async (userID, saveData, dataID) => {
    if (await checkFavorites(userID, dataID)) {
      toast({
        title: "This is already in favorites.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
      return false;
    }
    try {
      await setDoc(doc(db, "users", userID, "favorites", dataID), saveData);
      toast({
        title: "Succesfully added!",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "Saving unsuccesful. Please try again.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const removeWatchlist = async (userID, dataID) => {
    try {
      await deleteDoc(
        doc(db, "users", userID?.toString(), "watchlist", dataID?.toString())
      );
      toast({
        title: "Removed from watchlist.",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "Remove unsuccesful. Please try again.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const removeFavorite = async (userID, dataID) => {
    try {
      await deleteDoc(
        doc(db, "users", userID?.toString(), "favorites", dataID?.toString())
      );
      toast({
        title: "Removed from favorites.",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "Remove unsuccesful. Please try again.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const checkWatchList = async (userID, dataID) => {
    const docRef = doc(db, "users", userID, "watchlist", dataID?.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const checkFavorites = async (userID, dataID) => {
    const docRef = doc(db, "users", userID, "favorites", dataID?.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const getWatchList = useCallback(async (userID) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userID, "watchlist")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  const getFavorites = useCallback(async (userID) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userID, "favorites")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  return {
    addWatchList,
    checkWatchList,
    addFavouritesList,
    checkFavorites,
    removeWatchlist,
    removeFavorite,
    getWatchList,
    getFavorites
  };
};
