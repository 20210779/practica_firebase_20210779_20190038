import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  Image } from 'react-native';
import Navigation from './src/navigation/Navigation';

export default function App() {
  // appIsReady: Variable para indicar si la aplicación ya está lista
  // setAppIsReady: Función para actualizar la variable appIsReady
  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect: Hook que, de forma predeterminada, se ejecuta después del primer renderizado 
  // y después de cada actualización
  useEffect(() => {
    // Función asíncrona que simula la inicialización de la aplicación
    async function inicia() {
      try {
        // Retrasar el lanzamiento de la aplicación por 4 segundos
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (e) {
        // Mostrar error en caso de existir
        console.warn(e);
      } finally {
        // Cambiar valor de la variable para indicar que la aplicación está lista
        setAppIsReady(true); 
      }
    }

    // Llamar a la función inicia
    inicia();
  }, []); // El segundo argumento
  
  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/logo_Fazzbear.gif')}
          onLoadEnd={async () => {
            await SplashScreen.hideAsync();
          }}
          style={styles.gif}
        />
      </View>
    );
  }
  return (
    <Navigation />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: 200,
    height: 200,
  },
});