import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'lyrics_page.dart';
import 'package:url_launcher/url_launcher.dart';

class SearchPage extends StatefulWidget {
  final String artist;

  SearchPage({required this.artist});

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final TextEditingController _songController = TextEditingController();
  bool _isSearching = false;

  // ✅ Save search history in Firestore
  Future<void> _saveSearch(String song) async {
    User? user = FirebaseAuth.instance.currentUser;
    if (user == null) return;

    await FirebaseFirestore.instance
        .collection('users')
        .doc(user.uid)
        .collection('searchHistory')
        .doc(song) // Avoid duplicates
        .set({
      'song': song,
      'artist': widget.artist,
      'searchedAt': Timestamp.now(),
    });
  }

  // ✅ Search Song & Navigate
  void _searchSong() {
    String songName = _songController.text.trim();

    if (songName.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Please enter a song name"),
          backgroundColor: Colors.redAccent,
        ),
      );
      return;
    }

    setState(() => _isSearching = true);

    _saveSearch(songName); // ✅ Save to Firestore

    Future.delayed(Duration(milliseconds: 500), () {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => LyricsPage(artist: widget.artist, song: songName),
        ),
      );
      setState(() => _isSearching = false);
    });
  }

  // ✅ Open YouTube to play the song
  Future<void> _playOnYouTube(String song) async {
    String query = Uri.encodeComponent("${widget.artist} $song lyrics");
    final url = "https://www.youtube.com/results?search_query=$query";

    if (await canLaunch(url)) {
      await launch(url);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Could not open YouTube")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Search Songs - ${widget.artist}"),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _songController,
              decoration: InputDecoration(
                labelText: "Enter Song Name",
                labelStyle: TextStyle(color: Colors.white),
                filled: true,
                fillColor: Colors.black.withOpacity(0.2),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                suffixIcon: _isSearching
                    ? Padding(
                        padding: EdgeInsets.all(12),
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                      )
                    : IconButton(
                        icon: Icon(Icons.clear, color: Colors.white),
                        onPressed: () => _songController.clear(),
                      ),
              ),
              style: TextStyle(color: Colors.white),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton.icon(
                  onPressed: _isSearching ? null : _searchSong,
                  icon: Icon(Icons.search, color: Colors.black),
                  label: Text("Search", style: TextStyle(color: Colors.black)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(vertical: 14, horizontal: 24),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: () {
                    String song = _songController.text.trim();
                    if (song.isNotEmpty) {
                      _playOnYouTube(song);
                    }
                  },
                  icon: Icon(Icons.play_arrow, color: Colors.red),
                  label: Text("Play on YouTube", style: TextStyle(color: Colors.red)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(vertical: 14, horizontal: 24),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),

            // ✅ Display Search History
            Expanded(
              child: StreamBuilder<QuerySnapshot>(
                stream: FirebaseFirestore.instance
                    .collection('users')
                    .doc(FirebaseAuth.instance.currentUser!.uid)
                    .collection('searchHistory')
                    .orderBy('searchedAt', descending: true)
                    .snapshots(),
                builder: (context, snapshot) {
                  if (!snapshot.hasData) {
                    return Center(child: CircularProgressIndicator());
                  }

                  var history = snapshot.data!.docs;
                  if (history.isEmpty) {
                    return Center(child: Text("No search history", style: TextStyle(color: Colors.white)));
                  }

                  return ListView.builder(
                    itemCount: history.length,
                    itemBuilder: (context, index) {
                      var songData = history[index];
                      return ListTile(
                        title: Text(songData['song'], style: TextStyle(color: Colors.white)),
                        subtitle: Text("by ${songData['artist']}", style: TextStyle(color: Colors.white70)),
                        trailing: Icon(Icons.history, color: Colors.grey),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => LyricsPage(
                                artist: songData['artist'],
                                song: songData['song'],
                              ),
                            ),
                          );
                        },
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
      backgroundColor: Colors.deepPurple[900], // Dark Theme Background
    );
  }
}
