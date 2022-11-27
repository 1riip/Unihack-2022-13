import express from "express";

const router=express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // check login
    if (username == 2 && password == 2) {
        return res.redirect('/proba.html');
    } else {
        return res.redirect('/');
    }
});

export default router;