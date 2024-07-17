import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image,TouchableOpacity, ImageBackground, TextInput, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });

    return () => unsubscribe();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);

  };

  const handleAuthentication = () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'El formato del email es incorrecto.');
      setEmail(''); 
      setPassword('');
      return;
    }

    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User signed in:', user);
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.error('Sign in error:', error);
          Alert.alert('Error', 'Error al iniciar sesión. Verifique sus credenciales.');
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User registered:', user);
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.error('Registration error:', error);
          Alert.alert('Error', 'Error al registrarse. Verifique sus datos.');
        });
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background_login.png')}
      style={styles.background}
    >
      <View style={styles.container}>
      <Image
          style={styles.login}
          source={require('../../assets/login_fazzbear.png')} // Ruta de tu nueva imagen
        />
        <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
          <Text style={styles.buttonText}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 16,
    color: '#fff',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleText: {
    marginTop: 16,
    color: '#007bff',
  },
  logo: {
    width: 200,
    height: 200,
  },
  login: {
    position: 'absolute',
    bottom: 20, // Ajusta este valor para posicionar la imagen según sea necesario
    width: 200, // Ajusta el tamaño de la imagen según sea necesario
    height: 100, // Ajusta el tamaño de la imagen según sea necesario
  },
});
