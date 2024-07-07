let gas_val= null;
let electricity=null;
let cylinder= null;
let pipeline= null;
let dropdown= null;
let vehicle_cfp= null;
let elec_cfp= null;
let gas_cfp= null;
let names= null;

//The below gunction is to switch forms depending on individual/ society choice
document.querySelectorAll("button.user_choice").forEach(button => {button.addEventListener("click", function(e){open_form(e)});});

function open_form(e){
    names= e.target.id;
    console.log(names);    
    if (names==="ind"){
        document.querySelector(".choice").style.display= 'block';
        document.querySelectorAll(".indiv").forEach(element =>{element.style.display= 'block';});
        document.querySelectorAll(".society").forEach(element =>{element.style.display= 'none';});

    }
    else if (names==="soc"){
        document.querySelector(".choice").style.display= 'block';
        document.querySelectorAll(".society").forEach(element =>{element.style.display= 'block';});
        document.querySelectorAll(".indiv").forEach(element =>{element.style.display= 'none';});
    }
}

document.querySelectorAll(".gas_choice").forEach(button => {button.addEventListener("click", function(e){gas_info(e)});});

function gas_info(e){
    gas_val= e.target.id;
    console.log(gas_val);
    if(gas_val == 'cyl'){
        document.querySelector(".a").style.display= 'block';
        document.querySelector(".b").style.display= 'none';
  
    }
    else{
        document.querySelector(".a").style.display= 'none';
        document.querySelector(".b").style.display= 'block';
    }
}

//Form is about to be submitted now
document.querySelector("#submit_but").addEventListener("click", function(ev){
    ev.preventDefault();
    pass_values();
    calculate();
})

function pass_values(){
    //First know area in which the user lives, so we can calculate avg. CFP due to vehicles.
    dropdown= document.querySelector(".area").value;
    //Now get values of electricity used, and gas used
    electricity= parseFloat(document.querySelector("#e_bill").value);
    console.log(electricity);
    console.log(gas_val);
    if(gas_val== 'cyl'){
        cylinder= parseFloat(document.querySelector("#cyl_bill").value);
        console.log(cylinder);
    }
    else if(gas_val== "pipe"){
        pipeline= parseFloat(document.querySelector("#pipe_bill").value);
        console.log(pipeline);
    }
}

//actual calculation
function calculate(){ 
        var cfp;
        calculate_vehicle_cfp(dropdown);
        calculate_elec_cfp();
        calculate_gas_cfp(gas_val);

        if(names == 'ind'){
            cfp= (vehicle_cfp + elec_cfp + gas_cfp)/ 1000;
            console.log("You generate "+ cfp +" metric tonnes of CO2 per year");
        }

        else if(names == 'soc'){
            var houses= parseFloat(document.getElementById("house_no").value);
            cfp= ((vehicle_cfp + elec_cfp + gas_cfp) * houses) / 1000;
            console.log("Your society generates " + cfp + " metric tonnes of CO2 per year");
        }
}

function calculate_vehicle_cfp(dropdown){
    //vehicle_cfp;
    switch (dropdown){
        case 'Rural':
            vehicle_cfp= (7300/25)* 9.5;
            break;
        case 'Suburban':
            vehicle_cfp= (18250/16)* 9.5;
            break;
        case 'Urban':
            vehicle_cfp= (100375/16)* 9.5;
            break;
        case 'Metropolitan':
            vehicle_cfp= (12775/17)* 9.5;
            break;
    }
}

function calculate_elec_cfp() {
    elec_cfp= electricity * 1.5 * 0.454 * 12; // *12 for yearly amount
}

function calculate_gas_cfp(gas_val){
    //gas_cfp;
    if (gas_val == 'cyl'){
        gas_cfp = cylinder * 743.89 ; // user has put in yearly amount 
    }
    else if(gas_val == 'pipe'){
        gas_cfp = pipeline * 2.2 * 12; //pipeline is in units std cu. metre and 12 is for yearly amount
    }
}
