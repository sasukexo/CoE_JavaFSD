import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:url_launcher/url_launcher.dart';

class LyricsPage extends StatefulWidget {
  final String artist;
  final String song;

  LyricsPage({required this.artist, required this.song});

  @override
  _LyricsPageState createState() => _LyricsPageState();
}

class _LyricsPageState extends State<LyricsPage> {
  bool isFavorite = false;
  String lyrics = "Loading...";
  String albumArtUrl = "";
  User? user = FirebaseAuth.instance.currentUser;

  @override
  void initState() {
    super.initState();
    _checkIfFavorite();
    _fetchLyrics();
    _fetchAlbumArt();
    
  }

  // ✅ Fetch lyrics from API
Future<void> _fetchLyrics() async {
  setState(() {
    lyrics = "Loading...";  // ✅ Reset lyrics when fetching new song
  });

  try {
    final response = await http.get(
      Uri.parse("https://api.lyrics.ovh/v1/${widget.artist}/${widget.song}"),
    );

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);
      setState(() {
        lyrics = data["lyrics"] ?? "Lyrics not found";
      });
    } else {
      throw Exception("API returned status code ${response.statusCode}");
    }
  } catch (e) {
    setState(() {
      lyrics = "Error fetching lyrics: ${e.toString()}";
    });
  }
}


  // ✅ Fetch album art using iTunes API
  Future<void> _fetchAlbumArt() async {
    final response = await http.get(
      Uri.parse("https://itunes.apple.com/search?term=${widget.artist}+${widget.song}&entity=song"),
    );

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);
      var results = data['results'];
      if (results.isNotEmpty) {
        setState(() {
          albumArtUrl = results[0]['artworkUrl100']; // Get album art URL
        });
      }
    }
  }

Future<void> _checkIfFavorite() async {
  if (user == null) return;

  try {
    String songID = widget.song.toLowerCase().trim();  // ✅ Normalize song title

    var favDoc = await FirebaseFirestore.instance
        .collection('users')
        .doc(user!.uid)
        .collection('favorites')
        .doc(songID)
        .get();

    if (mounted) {
      setState(() {
        isFavorite = favDoc.exists;
      });
    }
  } catch (e) {
    print("Error checking favorite: $e");
  }
}

  // ✅ Toggle favorite status
Future<void> _toggleFavorite() async {
  if (user == null) return;

  String songID = widget.song.toLowerCase().trim();  // ✅ Normalize song title

  var favRef = FirebaseFirestore.instance
      .collection('users')
      .doc(user!.uid)
      .collection('favorites')
      .doc(songID);

  if (isFavorite) {
    await favRef.delete();
  } else {
    await favRef.set({
      'song': widget.song,
      'artist': widget.artist,
      'addedAt': Timestamp.now(),
    });
  }

  if (mounted) {
    setState(() {
      isFavorite = !isFavorite;
    });
  }
}



  // ✅ Open YouTube search for the song
  void _openYouTube() async {
  String query = Uri.encodeComponent("${widget.artist} ${widget.song}");

  // YouTube app deep link for Android
  Uri youtubeAppUri = Uri.parse("vnd.youtube://www.youtube.com/results?search_query=$query");

  // YouTube app deep link for iOS
  Uri youtubeIosUri = Uri.parse("youtube://www.youtube.com/results?search_query=$query");

  // Fallback to browser link
  Uri youtubeWebUri = Uri.parse("https://www.youtube.com/results?search_query=$query");

  // Check if YouTube app is installed
  if (await canLaunchUrl(youtubeAppUri)) {
    await launchUrl(youtubeAppUri);
  } else if (await canLaunchUrl(youtubeIosUri)) {
    await launchUrl(youtubeIosUri);
  } else {
    await launchUrl(youtubeWebUri, mode: LaunchMode.externalApplication);
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: Text(widget.song, style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: AnimatedSwitcher(
              duration: Duration(milliseconds: 300),
              transitionBuilder: (child, anim) =>
                  ScaleTransition(scale: anim, child: child),
              child: Icon(
                isFavorite ? Icons.favorite : Icons.favorite_border,
                key: ValueKey(isFavorite),
                color: isFavorite ? Colors.red : Colors.white,
              ),
            ),
            onPressed: _toggleFavorite,
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.deepPurple, Colors.black],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  widget.artist.toUpperCase(),
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: Colors.white70,
                  ),
                ),
                SizedBox(height: 10),

                // ✅ Show album art if available
                albumArtUrl.isNotEmpty
                    ? ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: Image.network(
                          albumArtUrl,
                          height: 150,
                          fit: BoxFit.cover,
                        ),
                      )
                    : SizedBox.shrink(),

                SizedBox(height: 10),

                Expanded(
                  child: Container(
                    padding: EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.4),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: lyrics == "Loading..."
                        ? Center(child: CircularProgressIndicator(color: Colors.white))
                        : SingleChildScrollView(
                            child: Text(
                              lyrics,
                              style: TextStyle(
                                fontSize: 16,
                                fontFamily: "monospace",
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                  ),
                ),

                SizedBox(height: 10),

                // ✅ Play song on YouTube button
                ElevatedButton.icon(
                  icon: Icon(Icons.play_arrow),
                  label: Text("Play on YouTube"),
                  style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.white,
                    backgroundColor: Colors.redAccent,
                  ),
                  onPressed: _openYouTube,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
