function signup(event){
    event.preventDefault();
var email=document.getElementById("email").value;
var mdp=document.getElementById("pass").value;
var nom=document.getElementById("nom").value;
var prenom=document.getElementById("prenom").value;
var utilisateur={
    email:email,
    nom:nom,
    prenom:prenom,
    pass:cryptPass(mdp),
};
localStorage.setItem(email,JSON.stringify(utilisateur));
console.log('utilisateur ajoute');
}
function login(event){
    event.preventDefault();
    var email=document.getElementById("email").value;
    var pass=document.getElementById("pass").value;
    var res=document.getElementById("hcn");


    var utilisateur=localStorage.getItem(email);
    var data=JSON.parse(utilisateur);
    console.log(data);

   if(utilisateur==null){
    res.innerHTML="wrong email";
    }
else if(email==data.email&&cryptPass(pass)==data.pass){
    res.innerHTML="logged in";
}
else{
    res.innerHTML="wrong password";
}

}
 
const cryptPass = function(str) {
    const hs=[0xdeadbeef ^ 0,0x41c6ce57 ^ 0,0xfae69b63 ^ 0,0xbadcaffe ^ 0];
    const imu2prm=[2654435761,1597334677,9745628194,6219433873,
                   2246822507,3266489909,9807643451,4576128788];
    let hash,i,ch;
    for (i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        for(let j=0;j<4;j++){
            hs[j] = Math.imul(hs[j] ^ ch, imu2prm[j]);
        }
    }  
    for(i=0;i<4;i+=2){
        hs[i] = Math.imul(hs[i] ^ (hs[i]<<32), imu2prm[i+4]) ^ Math.imul(hs[i+1] ^ (hs[i+1]<<9), imu2prm[i+5]);
        hs[i+1] = Math.imul(hs[i+1] ^ (hs[i+1]<<32), imu2prm[i+4]) ^ Math.imul(hs[i] ^ (hs[i]<<9), imu2prm[i+5]);
    } 

    hash=(hs[1]>>>0).toString(32).padStart(16,(hs[2]>>>0).toString(16).padStart(8,0));
    hash+=(hs[0]>>>0).toString(32).padStart(16,(hs[3]>>>0).toString(16).padStart(8,0));
    return hash;
 };