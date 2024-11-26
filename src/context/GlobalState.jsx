/** @format */

import { useState, useRef, createContext, useEffect } from "react";
import { getToken, getUsername } from "../utils/js-cookie";

export const CtxProvider = createContext();

// eslint-disable-next-line react/prop-types
export function GlobalState({ children }) {
  const [user, setUser] = useState(getToken());
  const [currentUsername, setCurrentUsername] = useState(getUsername());
  const [isOpen, setIsOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tweetBoxModal, setTweetBoxModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const queryRef = useRef(null);

  return (
    <CtxProvider.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        isOpen,
        setIsOpen,
        isRegister,
        setIsRegister,
        currentUsername,
        setCurrentUsername,
        queryRef,
        tweetBoxModal,
        setTweetBoxModal,
        editProfileModal,
        setEditProfileModal,
      }}
    >
      {children}
    </CtxProvider.Provider>
  );
}
