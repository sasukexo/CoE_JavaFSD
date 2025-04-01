import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:googles/welcome_page.dart';
import 'l10n/app_localizations.dart';
import 'login_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp();
    runApp(MyApp());
  } catch (e) {
    runApp(ErrorApp(errorMessage: e.toString()));
  }
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  ValueNotifier<Locale> _localeNotifier = ValueNotifier(Locale('en')); // Default language

  void _changeLanguage(Locale locale) {
    _localeNotifier.value = locale; // ✅ Updates the language dynamically
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<Locale>(
      valueListenable: _localeNotifier,
      builder: (context, locale, child) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Lyrics Finder',
          theme: ThemeData.dark(),
          supportedLocales: [
            Locale('en', ''), // English
            Locale('hi', ''), // Hindi
            Locale('es', ''), // Spanish
            Locale('ta', ''), // Tamil
          ],
          locale: locale, // ✅ Language changes dynamically
          localizationsDelegates: [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          localeResolutionCallback: (locale, supportedLocales) {
            return supportedLocales.firstWhere(
              (supportedLocale) => supportedLocale.languageCode == locale?.languageCode,
              orElse: () => Locale('en', ''),
            );
          },
          home: AuthCheck(changeLanguage: _changeLanguage), // Pass function to change language
        );
      },
    );
  }
}

class AuthCheck extends StatefulWidget {
  final Function(Locale) changeLanguage;
  AuthCheck({required this.changeLanguage});

  @override
  _AuthCheckState createState() => _AuthCheckState();
}

class _AuthCheckState extends State<AuthCheck> {
  Locale _currentLocale = Locale('en'); // Default language
  final List<Locale> _supportedLocales = [
    Locale('en'),
    Locale('hi'),
    Locale('es'),
    Locale('ta'),
  ];

  // 🔹 Function to cycle through languages
  void _cycleLanguage(bool next) {
    int currentIndex = _supportedLocales.indexOf(_currentLocale);
    int newIndex = next
        ? (currentIndex + 1) % _supportedLocales.length
        : (currentIndex - 1 + _supportedLocales.length) % _supportedLocales.length;

    setState(() {
      _currentLocale = _supportedLocales[newIndex];
      widget.changeLanguage(_currentLocale);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(AppLocalizations.of(context).getString("app_title")), // ✅ Localized App Name
            StatefulBuilder(
              builder: (context, setState) {
                return DropdownButton<Locale>(
                  value: _currentLocale,
                  icon: Icon(Icons.language, color: Colors.white),
                  dropdownColor: Colors.grey[900],
                  underline: SizedBox(), // ✅ Hide underline
                  onChanged: (Locale? newLocale) {
                    if (newLocale != null) {
                      setState(() => _currentLocale = newLocale); // ✅ Updates UI
                      widget.changeLanguage(newLocale); // ✅ Updates app language
                    }
                  },
                  items: _supportedLocales.map((locale) {
                    return DropdownMenuItem(
                      value: locale,
                      child: Text(_getLanguageName(locale.languageCode)),
                    );
                  }).toList(),
                );
              },
            ),
          ],
        ),
      ),

      body: GestureDetector(
        onHorizontalDragUpdate: (details) {
          if (details.primaryDelta! > 10) {
            _cycleLanguage(false); // ✅ Swipe Right (Previous Language)
          } else if (details.primaryDelta! < -10) {
            _cycleLanguage(true); // ✅ Swipe Left (Next Language)
          }
        },
        child: StreamBuilder<User?>(
          stream: FirebaseAuth.instance.authStateChanges(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return SplashScreen();
            } else if (snapshot.hasError) {
              return ErrorScreen(errorMessage: snapshot.error.toString());
            } else {
              final user = snapshot.data;
              return user == null ? LoginPage() : WelcomePage();
            }
          },
        ),
      ),
    );
  }

  // 🔹 Function to get readable language names
  String _getLanguageName(String code) {
    switch (code) {
      case 'en':
        return "English";
      case 'hi':
        return "हिन्दी";
      case 'es':
        return "Español";
      case 'ta':
        return "தமிழ்";
      default:
        return "Unknown";
    }
  }
}

// ✅ Localized Splash Screen
class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircularProgressIndicator(color: Colors.white),
            SizedBox(height: 10),
            Text(
              AppLocalizations.of(context).getString("loading"),
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}

// ✅ Error Screen for Firebase Initialization Errors
class ErrorApp extends StatelessWidget {
  final String errorMessage;
  ErrorApp({required this.errorMessage});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ErrorScreen(errorMessage: errorMessage),
    );
  }
}

class ErrorScreen extends StatelessWidget {
  final String errorMessage;
  ErrorScreen({required this.errorMessage});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.error, color: Colors.red, size: 50),
              SizedBox(height: 10),
              Text(
                AppLocalizations.of(context).getString("error"),
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 5),
              Text(errorMessage, textAlign: TextAlign.center),
            ],
          ),
        ),
      ),
    );
  }
}
