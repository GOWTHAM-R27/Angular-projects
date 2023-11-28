
const UserName= document.getElementById('username');
console.log("UserName");

const userName= document.getElementById('username-error');
        const email= document.getElementById('email-error');
        const phone= document.getElementById('number-error');
        const password= document.getElementById('password-error');
        const cpassword= document.getElementById('cpassword-error');

        function validatename(){
            const namecheck=document.getElementById('username').value.trim();

            if(namecheck===''){
                userName.innerHTML='please enter username';
                document.getElementById("username").style.borderColor = "red";
                return false;
            }
            else if (!namecheck.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{7,15}$/)){
                userName.innerHTML='User name-[7-15 characters and one number (*no special character*)]';
                document.getElementById("username").style.borderColor = "red";
                return false;
            }
            else{
                userName.innerHTML='';
                document.getElementById("username").style.borderColor = "green";
                return true;
            }
        }

        function validateemail(){
            const emailcheck=document.getElementById('email').value.trim();

            if(emailcheck==='')
            {
                email.innerHTML='Please enter your email id';
                document.getElementById("email").style.borderColor = "red";
                return false;
            }
            if(!emailcheck.match(/^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/)){
                email.innerHTML='Please enter valid email id';
                document.getElementById("email").style.borderColor = "red";
                return false;
            }
            if(emailcheck.match(/^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/)){
                email.innerHTML='';
                document.getElementById("email").style.borderColor = "green";
                return true;
            }
        }
        function validatephone(){
            const phonecheck=document.getElementById('Mobile_no').value.trim();
            if(phonecheck==='')
            {
                phone.innerHTML='Please enter your mobile number';
                document.getElementById("Mobile_no").style.borderColor = "red";
                return false;
            }
            if (isNaN(phonecheck) || phonecheck == ""){
                phone.innerHTML='Please enter 10 digit number';
                document.getElementById("Mobile_no").style.borderColor = "red";
                return false;
            }
            if(phonecheck.length>10 || phonecheck.length<10){
                phone.innerHTML='Please enter 10 digit number';
                document.getElementById("Mobile_no").style.borderColor = "red";
                return false;
            }
            else{
                phone.innerHTML='';
                document.getElementById("Mobile_no").style.borderColor = "green";
                return true;
            }

        }
        function validatepassword()
        {
            const passwordcheck=document.getElementById('password').value.trim();
            if(passwordcheck==='')
            {
                password.innerHTML='Please create your password';
                document.getElementById("password").style.borderColor = "red";
                return false;
            }
            else if(!passwordcheck.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))
            {
                password.innerHTML='7-15 characters-At least one numeric digit and special character';
                document.getElementById("password").style.borderColor = "red";
                return false;
            }
            else if(passwordcheck.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)) {
                password.innerHTML='';
                document.getElementById("password").style.borderColor = "Green";
                return true;
            }
        }
        function validatecpassword(){
            const passwordcheck1=document.getElementById('cpassword').value.trim();
            passwordcheck=document.getElementById('password').value.trim();
            if(passwordcheck1==='')
            {
                cpassword.innerHTML='Please confirm your password';
                document.getElementById("cpassword").style.borderColor = "red";
                return false;
            }
            if(passwordcheck1!==passwordcheck)
            {
                cpassword.innerHTML='Password does not match';
                document.getElementById("cpassword").style.borderColor = "red";
                return false;
            }
            if(passwordcheck1===passwordcheck)
            {
                cpassword.innerHTML='';
                document.getElementById("cpassword").style.borderColor = "Green";
                return true;
            }
        }
        function validateform()
        {
            if(!validatename()||!validateemail()||!validatephone()||!validatepassword()||!validatecpassword()){
            alert('Please fill the details correctly');
            return false;
        }
        }
