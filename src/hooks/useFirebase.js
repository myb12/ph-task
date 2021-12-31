import initializeFirebase from "../Firebase/firebase.init";
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, getIdToken } from "firebase/auth";
import axios from "axios";


// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [loggedInUserFromDB, setLoggedInUserFromDB] = useState();

    const auth = getAuth();

    const registerUser = (email, password, name, history, userData) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');

                const newUser = { email, displayName: name };
                setUser(newUser);
                //save user to db
                saveUser(email, name, userData, 'POST');
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }


    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        sessionStorage.setItem('jwt', idToken);
                    })
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, userData, method) => {
        userData.email = email;
        userData.displayName = displayName;

        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => { })
    }


    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => {
                setAllUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        const loggedIn = allUsers.find(each => each.email === user.email);
        setLoggedInUserFromDB(loggedIn);
    }, [allUsers, user.email])

    /*
        useEffect(() => {
            fetch(`https://secret-anchorage-33116.herokuapp.com/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setAdmin(data.admin);
                })
        }, [user.email]) */

    return {
        user,
        isLoading,
        setIsLoading,
        authError,
        registerUser,
        loginUser,
        logout,
        admin,
        allUsers,
        loggedInUserFromDB
    }
}

export default useFirebase;