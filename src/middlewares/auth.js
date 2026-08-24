const adminAuth = (req, res, next) => {
    console.log("Admin Auth is being checked");
    const AuthToken = 'xyz';
    const isAdminAuthrorized = 'xyz' === AuthToken;
    if(!isAdminAuthrorized){
        res.status(401).send('Unauthorized access!');   
    }else{
        next(); // Call the next handler
    }
};

const userAuth = (req, res, next) => {
    console.log("User Auth is being checked");
    const userToken = "abcxyz";
    const isUserAuthorized = "abcxyz" === userToken;
    if(!isUserAuthorized){
        res.status(401).send('Unauthorized access!');   
    }else{
        next(); // Call the next handler
    }
};

module.exports = {
    adminAuth,
    userAuth
};