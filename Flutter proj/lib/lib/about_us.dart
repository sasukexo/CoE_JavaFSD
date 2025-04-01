import 'package:flutter/material.dart';
import 'artist_selection_page.dart';

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
                backgroundImage: AssetImage('assets/music.png'), // Add app logo
              ),
            ),
            SizedBox(height: 20),
            Text(
              "Lyrics Finder",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Text(
              "Lyrics Finder helps you search for song lyrics and save your favorites easily. "
              "With a seamless experience, you can enjoy your favorite songs anytime!",
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
            Spacer(),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  padding: EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                ),
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => ArtistSelectionPage()),
                  );
                },
                child: Text("Continue"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
