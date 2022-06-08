# Terminology

### `Thread`

It is collection of messages . It can be private or group . Messages in a group are inside group thread whereas private messages are part of private thread( between two users ) .

# BACKEND

## Database

- Hasura is used for providing graphql api ( for less network requests ) to fetch threads ()

- Tables in hasura database are `threads` , `users` , `user_thread` and `messages` .

Database tables structures are :

<!-- table  -->
<caption><b style="color:gray;text-decoration:underline;">users</b></caption>
<table style="border: 1px solid white;">
<tr><th>COL</th> <th>DATA TYPE</th></tr>
<tr><td>id</td> <td>UUID</td></tr>
<tr><td>name</td> <td>TEXT</td></tr>
<tr><td>image_url</td> <td>text</td></tr>
<tr><td>contact_number</td> <td>numeric</td></tr>
</table>

<!-- table  -->
<caption><b style="color:gray;text-decoration:underline;">threads</b></caption>
<table style="border: 1px solid white;">
<tr><th>COL</th> <th>DATA TYPE</th></tr>
<tr><td>id</td> <td>UUID</td></tr>
<tr><td>private</td> <td>boolean</td></tr>
</table>

<!-- table  -->
<caption><b style="color:gray;text-decoration:underline;">messages</b></caption>
<table style="border: 1px solid white;">
<tr><th>COL</th> <th>DATA TYPE</th></tr>
<tr><td>id</td> <td>UUID</td></tr>
<tr><td>text</td> <td>TEXT</td></tr>
<tr><td>sender_id</td> <td>UUID</td></tr>
<tr><td>thread_id</td> <td>UUID</td></tr>
<tr><td>created_at</td> <td>timestamp</td></tr>
</table>

<!-- table  -->
<caption><b style="color:gray;text-decoration:underline;">user_thread</b></caption>
<table style="border: 1px solid white;">
<tr><th>COL</th> <th>DATA TYPE</th></tr>
<tr><td>id</td> <td>UUID</td></tr>
<tr><td>thread_id</td> <td>UUID</td></tr>
<tr><td>user_id</td> <td>UUID</td></tr>
</table>

