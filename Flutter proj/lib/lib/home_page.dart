import 'package:flutter/material.dart';

class AboutUsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("About Us")),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: CircleAvatar(
                radius: 50,
                backgroundImage: AssetImage('assets/logo.png'), // Add an app logo
              ),
            ),
            SizedBox(height: 20),
            Text(
              "Lyrics Finder",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Text(
              "Lyrics Finder is an easy-to-use app that lets you search song lyrics and save your favorites. "
              "Explore lyrics, favorite your top songs, and enjoy a seamless experience with Firebase authentication.",
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 20),
            ListTile(
              leading: Icon(Icons.email, color: Colors.blue),
              title: Text("Contact Us: support@lyricsfinder.com"),
            ),
            ListTile(
              leading: Icon(Icons.web, color: Colors.blue),
              title: Text("Website: www.lyricsfinder.com"),
            ),
            ListTile(
              leading: Icon(Icons.info, color: Colors.blue),
              title: Text("Version: 1.0.0"),
            ),
          ],
        ),
      ),
    );
  }
}
