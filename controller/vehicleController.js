module.exports={
    getAllVehicles:(req,res)=>{
        const db = req.app.get('db');

        db.get_all_vehicles()
            .then(items=>res.status(200).send(items))
            .catch(err=>res.status(500).send(err))
    },
    addVehicle:(req,res)=>{
        const db = req.app.get('db');
        const {make,model,year,owner_id}  = req.body
        db.add_vehicle([make,model,year,owner_id])
            .then(vehicle=>res.status(200).send(vehicle))
            .catch(err=>console.log(err))
    },
    getVehicles:(req,res)=>{
        const db = req.app.get('db');
        const {userEmail,userFirstStart} = req.query;

        if(userEmail){
            db.get_vehicles_by_email([userEmail])
                .then(cars=>res.status(200).send(cars))
                .catch(err=>console.log(err));
        }

        if(userFirstStart){
            db.get_vehicles_by_name([userFirstStart])
                .then(cars=>res.status(200).send(cars))
                .catch(err=>console.log(err))
        }
    },
    getVehicleByYear:(req,res)=>{
        const db = req.app.get('db');

        db.get_vehicle_by_year()
            .then(cars=>res.status(200).send(cars))
            .catch(err=>console.log(err))
    },
    changeVehicleOwnership:(req,res)=>{
        const db = req.app.get('db');
        const {vehicleId,userId} = req.params;

        db.change_vehicle_ownership([vehicleId,userId])
            .then(car=>{
                car[0].year=parseInt(car[0].year)
                // console.log(car);
                res.status(200).send(car)})
            .catch(err=>console.log(err));
    },
    removeOwnership:(req,res)=>{
        const db = req.app.get('db');
        console.log(req.params);
        const {userId,vehicleId} = req.params;

        db.remove_ownership([userId,vehicleId])
            .then(car=>{
                car[0].year = parseInt(car[0].year)
                res.status(200).send(car)})
            .catch(err=>console.log(err));
    },
    deleteVehicle:(req,res)=>{
        const db = req.app.get('db');

        const {vehicleId} = req.params;
        
        db.delete_vehicle([vehicleId])
            .then(car=>{
                car[0].year = parseInt(car[0].year)
                res.status(200).send(car)})
            .catch(err=>console.log(err));
    }
}