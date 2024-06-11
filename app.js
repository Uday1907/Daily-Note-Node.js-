const express=require('express');
const bodyParser=require('body-parser');
const _ =require('lodash');

const posts=[];

const homepara="In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Sit amet nisl purus in mollis nunc sed id semper. Pellentesque id nibh tortor id aliquet lectus proin. Amet mauris commodo quis imperdiet massa tincidunt nunc. Massa vitae tortor condimentum lacinia quis vel. Arcu vitae elementum curabitur vitae nunc sed. Phasellus egestas tellus rutrum tellus. Dui nunc mattis enim ut. Eget velit aliquet sagittis id consectetur purus ut. Nulla facilisi cras fermentum odio eu feugiat pretium. Pellentesque habitant morbi tristique senectus et netus. Porta non pulvinar neque laoreet suspendisse interdum. Suspendisse sed nisi lacus sed viverra tellus in. Tincidunt praesent semper feugiat nibh sed. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Fames ac turpis egestas maecenas. Tortor aliquam nulla facilisi cras. Ipsum faucibus vitae aliquet nec ullamcorper sit."
const aboutpara="In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Sit amet nisl purus in mollis nunc sed id semper. Pellentesque id nibh tortor id aliquet lectus proin. Amet mauris commodo quis imperdiet massa tincidunt nunc. Massa vitae tortor condimentum lacinia quis vel. Arcu vitae elementum curabitur vitae nunc sed. Phasellus egestas tellus rutrum tellus. Dui nunc mattis enim ut. Eget velit aliquet sagittis id consectetur purus ut. Nulla facilisi cras fermentum odio eu feugiat pretium. Pellentesque habitant morbi tristique senectus et netus. Porta non pulvinar neque laoreet suspendisse interdum. Suspendisse sed nisi lacus sed viverra tellus in. Tincidunt praesent semper feugiat nibh sed. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Fames ac turpis egestas maecenas. Tortor aliquam nulla facilisi cras. Ipsum faucibus vitae aliquet nec ullamcorper sit."
const contactpara="In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Sit amet nisl purus in mollis nunc sed id semper. Pellentesque id nibh tortor id aliquet lectus proin. Amet mauris commodo quis imperdiet massa tincidunt nunc. Massa vitae tortor condimentum lacinia quis vel. Arcu vitae elementum curabitur vitae nunc sed. Phasellus egestas tellus rutrum tellus. Dui nunc mattis enim ut. Eget velit aliquet sagittis id consectetur purus ut. Nulla facilisi cras fermentum odio eu feugiat pretium. Pellentesque habitant morbi tristique senectus et netus. Porta non pulvinar neque laoreet suspendisse interdum. Suspendisse sed nisi lacus sed viverra tellus in. Tincidunt praesent semper feugiat nibh sed. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Fames ac turpis egestas maecenas. Tortor aliquam nulla facilisi cras. Ipsum faucibus vitae aliquet nec ullamcorper sit."

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');


app.get('/',function(req,res){
    res.render('home',{
        homeparagraph:homepara,
        postList:posts

    });
});

app.get('/about',function(req,res){
    res.render('about',{
        aboutparagraph:aboutpara
    })
})
app.get('/contact',function(req,res){
    res.render('contact',{
        contactparagraph:contactpara
    })
})
app.get('/compose',function(req,res){
    res.render('compose',{
    })
});


app.get('/posts/:title',function(req,res){
    const reqpost=_.lowerCase(req.params.title);
    posts.forEach(function(post){
        var storedTitle=post.title;
        storedTitle=_.lowerCase(storedTitle);

        if(reqpost===storedTitle){
            res.render('post',{
                postName:post.title,
                postContent:post.content
            })
            // use lodash(_) for url design like if we type day1 it should display Day 1 content
        }
        else{
            console.log("not found");
        }
    })
})

app.post('/compose',function(req,res){
    const newPost={
        title:req.body.postTitle,
        content:req.body.postContent
    };
    posts.push(newPost);
    res.redirect('/');

})

app.listen(3000,function(){
    console.log("server is ready");
});