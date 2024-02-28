const router = require(`express`).Router()

const jerseysModel = require(`../models/jerseys`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

// read all records
router.get(`/jerseys`, (req, res) => 
{   
    //user does not have to be logged in to see jersey details
    jerseysModel.find((error, data) => 
    {
        res.json(data)
    })
})


// Read one record
router.get(`/jerseys/:id`, (req, res) => 
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            jerseysModel.findById(req.params.id, (error, data) => 
            {
                res.json(data)
            })
        }
    })
})


// Add new record
router.post(`/jerseys`, (req, res) => 
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
            {                
                // Use the new car details to create a new car document
                jerseysModel.create(req.body, (error, data) => 
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not an administrator, so they cannot add new records`})
            }
        }
    })
})


// Update one record
router.put(`/jerseys/:id`, (req, res) => 
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            jerseysModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
            {
                res.json(data)
            })        
        }
    })
})


// Delete one record
router.delete(`/jerseys/:id`, (req, res) => 
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
            {
                jerseysModel.findByIdAndRemove(req.params.id, (error, data) => 
                {
                    res.json(data)
                })
            }
            else
            {
                res.json({errorMessage:`User is not an administrator, so they cannot delete records`})
            }        
        }
    })
})

module.exports = router