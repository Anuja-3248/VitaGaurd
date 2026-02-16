import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, password, name) {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            return updateProfile(userCredential.user, {
                displayName: name
            });
        });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        let isMounted = true;

        // Safety timeout to prevent permanent white screen
        const timeout = setTimeout(() => {
            if (isMounted && loading) {
                console.warn('Auth loading timed out. Proceeding anyway.');
                setLoading(false);
            }
        }, 3000);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (isMounted) {
                setCurrentUser(user);
                setLoading(false);
                clearTimeout(timeout);
            }
        }, (error) => {
            console.error('Auth state error:', error);
            if (isMounted) {
                setLoading(false);
                clearTimeout(timeout);
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
            clearTimeout(timeout);
        };
    }, [loading]);

    const value = {
        currentUser,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
