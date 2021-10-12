// hashes user info in database
import bcrypt from 'bcryptjs';
// allows userlogin to persist
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
   
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User not found"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Password is incorrect"});

        // test needs to be replaced with a secret stored in a .env file
        // options other than expiresIn are available.  look into these.
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Unspecified signin error" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User already exists"});

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        // test needs to be replaced with a secret stored in a .env file
        // options other than expiresIn are available.  look into these.
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
        

        res.status(200).json({ result, token });
        

    } catch (error) {
        res.status(500).json({ message: "Unspecified signup error" });
        
        
    }
}
            