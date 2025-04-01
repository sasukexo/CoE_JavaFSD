import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'lyrics_page.dart'; // Import the LyricsPage to navigate to it

import 'package:firebase_auth/firebase_auth.dart';


class FavoritesPage extends StatefulWidget {
  @override
  _FavoritesPageState createState() => _FavoritesPageState();
}

class _FavoritesPageState extends State<FavoritesPage> {
  final User? user = FirebaseAuth.instance.currentUser;

  @override
  Widget build(BuildContext context) {
    if (user == null) {
      return Center(child: Text("Please log in to see your favorites"));
    }

    return Scaffold(
      appBar: AppBar(
        title: Text("Favorite Songs"),
        backgroundColor: Colors.pinkAccent,
      ),
      body: StreamBuilder(
        stream: FirebaseFirestore.instance
            .collection('users')
            .doc(user!.uid)
            .collection('favorites')
            .snapshots(),
        builder: (context, AsyncSnapshot<QuerySnapshot> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }

          if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
            return Center(
              child: Text("No favorite songs yet", style: TextStyle(fontSize: 18, color: Colors.white)),
            );
          }

          var favorites = snapshot.data!.docs;

          return ListView.builder(
            itemCount: favorites.length,
            itemBuilder: (context, index) {
              var data = favorites[index].data() as Map<String, dynamic>;
              String songID = favorites[index].id;
              String song = data['song'] ?? "Unknown Song";
              String artist = data['artist'] ?? "Unknown Artist";

              return ListTile(
                title: Text(song, style: TextStyle(fontSize: 18)),
                subtitle: Text(artist, style: TextStyle(fontSize: 16)),
                trailing: IconButton(
                  icon: Icon(Icons.delete, color: Colors.red),
                  onPressed: () async {
                    await FirebaseFirestore.instance
                        .collection('users')
                        .doc(user!.uid)
                        .collection('favorites')
                        .doc(songID)
                        .delete();
                  },
                ),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => LyricsPage(artist: artist, song: song),
                    ),
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}
