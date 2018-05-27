https://tranquil-headland-98719.herokuapp.com/
or
https://tranquil-headland-98719.herokuapp.com/home

to open homePage

Please open using chrome or firefox as it has not been optimized for safari or internet explorer yet

Unimplemented:
Wrong credentials -
    Will lead to passports built-in Unauthorized access, we needed to re-code the callbacks function to edit this
    routing, which are quite hard to do and we haven't manage to do so
Change picture profile -
    It was harder than we thought to let users upload images from their computer/device and store it in our mongoose
    as there exist size limitations and such
Unsubscribe -
    The current implementation of profile schema and mail sending was quite hard to accommodate unsubscribe feature
    We need to change quite large chunk of code to do so, we're very sorry

IMPORTANT:
For testing purposes, current code will send e-mail every 5 minutes, please delete your account through profile page
if you wish to stop receiving e-mails, sorry for the inconvenience