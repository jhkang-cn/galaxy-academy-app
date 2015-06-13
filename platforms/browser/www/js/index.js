function fetch_and_display_posts()
{
    var xhr = new XMLHttpRequest();
//    xhr.open("GET", "http://iflyk12.com/wp-json/posts");
    xhr.open("GET", "http://iflyk12.com/wp-admin/admin-ajax.php?action=posts");
    xhr.onload = function(){ 
	var postsj = JSON.parse(xhr.responseText);
//	navigator.notification.alert("dfafsa", null, "Wrong Creds", "Try Again");
	var html = "";
	for(var count = 0; count < postsj.length; count++)
        {
        	var title = postsj[count].title;
        	var link = postsj[count].link;
        	var date = postsj[count].date;
        	html = html + "<li>" + "<a href='javascript:open_browser(\"" + link + "\")'>"  + "<h2>" + title + "</h2>" + "<p>" + date + "</p></a></li>";
 	}
        document.getElementById("posts").innerHTML = html;
        $("#posts").listview("refresh");
    }
    xhr.send();
}
 
function login()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
 
    if(username == "")
    {
        navigator.notification.alert("Please enter username", null, "Username really Missing", "OK");
        return;
    }
 
    if(password == "")
    {
        navigator.notification.alert("Please enter password", null, "Password really Missing", "OK");  
        return;
    }
 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://iflyk12.com/wp-admin/admin-ajax.php?action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    xhr.onload = function(){  
        if(xhr.responseText == "FALSE")
        {
            navigator.notification.alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
        }
        else if(xhr.responseText == "TRUE")
        {   
	    fetch_and_display_posts();
            $("#page_two_link").click();
        }
	else
	{
	    navigator.notification.alert("what is that", null, xhr.responseText, "Try Again");
	    fetch_and_display_posts();
            $("#page_two_link").click();	
	}
    }   
    xhr.send();
}
 
function open_browser(link)
{
    window.open(link, '_blank', 'location=yes');
}
