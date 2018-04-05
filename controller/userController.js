module.exports={
    getAllUsers:(req,res)=>{
        const db = req.app.get('db');

        db.get_all_users()
            .then(users=>res.status(200).send(users))
            .catch(err=>res.status(500).error)
    },
    addUser:(req,res) =>{
        const db = req.app.get('db');
        const {name,email} = req.body
        db.add_user([name,email])
            .then(user=>res.status(200).send(user))
            .catch(err=>res.status(500).send(err))
    },
    getVehicleCount:(req,res)=>{
        const db = req.app.get('db');
        const {userId} = req.params;
        db.get_vehicle_count([userId])
            .then(count=>res.status(200).send(count))
            .catch(err=>res.status(500).send(err));
    },
    getUserVehicle:(req,res)=>{
        const db = req.app.get('db');
        const {userId} = req.params;
        db.get_user_vehicle([userId])
            .then(cars=>res.status(200).send(cars))
            .catch(err=>res.status(500).send(err))
    }

}