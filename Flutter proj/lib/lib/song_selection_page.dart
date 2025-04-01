import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'lyrics_page.dart';

class SongSelectionPage extends StatefulWidget {
  final String artist;
  SongSelectionPage({required this.artist});

  @override
  _SongSelectionPageState createState() => _SongSelectionPageState();
}

class _SongSelectionPageState extends State<SongSelectionPage> {
  List<String> songs = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchSongs();
  }

  // ✅ Fetch songs dynamically from API
  Future<void> _fetchSongs() async {
    try {
      final response = await http.get(Uri.parse("https://api.lyrics.ovh/suggest/${widget.artist}"));
      
      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        setState(() {
          songs = data["data"].map<String>((song) => song["title"]).toList();
          isLoading = false;
        });
      } else {
        setState(() {
          songs = [];
          isLoading = false;
        });
      }
    } catch (e) {
      print("Error fetching songs: $e");
      setState(() {
        songs = [];
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Songs by ${widget.artist}")),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : songs.isEmpty
              ? Center(child: Text("No songs found"))
              : ListView.builder(
                  itemCount: songs.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(songs[index]),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => LyricsPage(
                              artist: widget.artist,
                              song: songs[index],
                            ),
                          ),
                        );
                      },
                    );
                  },
                ),
    );
  }
}
