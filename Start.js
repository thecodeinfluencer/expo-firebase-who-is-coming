import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  DarkTheme,
  DefaultTheme,
  Provider,
  ThemeProvider,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import AdminApp from './screens/app/AdminApp';
import EditResident from './screens/app/EditResident';
import EditVendor from './screens/app/EditVendor';
import ForgotPassword from './screens/app/ForgotPassword';
import GuestInfo from './screens/app/GuestInfo';
import Login from './screens/app/Login';
import ManageGuests from './screens/app/ManageGuests';
import ManageResidents from './screens/app/ManageResidents';
import ManageServices from './screens/app/ManageServices';
import ManageUnits from './screens/app/ManageUnits';
import ManageVendors from './screens/app/ManageVendors';
import RegisterGuest from './screens/app/RegisterGuest';
import RegisterResident from './screens/app/RegisterResident';
import RegisterSwitch from './screens/app/RegisterSwitch';
import RegisterVendor from './screens/app/RegisterVendor';
import ReportSuspicion from './screens/app/ReportSuspicion';
import ResidentApp from './screens/app/ResidentApp';
import ResidentSettings from './screens/app/ResidentSettings';
import ServiceInfo from './screens/app/ServiceInfo';
import Services from './screens/app/Services';
import Suspicions from './screens/app/Suspicions';
import VendorSettings from './screens/app/VendorSettings';
import ViewResidents from './screens/app/ViewResidents';
import Welcome from './screens/app/Welcome';

const AuthStack = createNativeStackNavigator();
const ResidentStack = createNativeStackNavigator();
const VendorStack = createNativeStackNavigator();

const isDark = false;

export default function Start() {
  const state = useSelector(st => st);
  const user = state.auth.user;

  return (
    <Provider theme={isDark ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={isDark ? DarkTheme : DefaultTheme}>
        <NavigationContainer>
          <StatusBar style='auto' />
          {!user ? (
            <AuthStack.Navigator
              initialRouteName='Welcome'
              screenOptions={{
                headerShown: false,
              }}
            >
              <AuthStack.Screen name='Welcome' component={Welcome} />
              <AuthStack.Screen name='Login' component={Login} />
              <AuthStack.Screen
                name='RegisterSwitch'
                component={RegisterSwitch}
              />
              <AuthStack.Screen
                name='RegisterResident'
                component={RegisterResident}
              />
              <AuthStack.Screen
                name='RegisterVendor'
                component={RegisterVendor}
              />
              <AuthStack.Screen
                name='RegisterGuest'
                component={RegisterGuest}
              />
              <AuthStack.Screen
                name='ForgotPassword'
                component={ForgotPassword}
              />
            </AuthStack.Navigator>
          ) : (
            <>
              {user?.role === 'resident' && (
                <ResidentStack.Navigator>
                  <ResidentStack.Screen
                    options={{
                      headerTitle: `${user?.names} (Resident)`,
                    }}
                    name='ResidentHome'
                    component={ResidentApp}
                  />
                  <ResidentStack.Screen name='Services' component={Services} />
                  <ResidentStack.Screen
                    name='Suspicions'
                    component={Suspicions}
                  />
                  <ResidentStack.Screen
                    name='ReportSuspicion'
                    component={ReportSuspicion}
                  />
                  <ResidentStack.Screen
                    name='ResidentSettings'
                    component={ResidentSettings}
                  />
                  <ResidentStack.Screen
                    name='ViewResidents'
                    component={ViewResidents}
                  />
                  <ResidentStack.Screen
                    name='ManageGuests'
                    component={ManageGuests}
                  />
                  <ResidentStack.Screen
                    name='GuestInfo'
                    component={GuestInfo}
                  />
                  <ResidentStack.Screen
                    name='ServiceInfo'
                    component={ServiceInfo}
                  />
                </ResidentStack.Navigator>
              )}
              {user?.role === 'vendor' && (
                <VendorStack.Navigator>
                  <VendorStack.Screen
                    name='VendorSettings'
                    component={VendorSettings}
                  />
                </VendorStack.Navigator>
              )}
              {user?.role === 'admin' && (
                <VendorStack.Navigator>
                  <VendorStack.Screen
                    options={{
                      headerTitle: `${user?.names} (Admin)`,
                    }}
                    name='AdminApp'
                    component={AdminApp}
                  />
                  <VendorStack.Screen
                    name='ManageUnits'
                    component={ManageUnits}
                  />
                  <VendorStack.Screen
                    name='ManageServices'
                    component={ManageServices}
                  />
                  <VendorStack.Screen
                    name='ManageVendors'
                    component={ManageVendors}
                  />
                  <VendorStack.Screen
                    name='ManageResidents'
                    component={ManageResidents}
                  />
                  <VendorStack.Screen
                    name='EditVendor'
                    component={EditVendor}
                  />
                  <VendorStack.Screen
                    name='EditResident'
                    component={EditResident}
                  />
                </VendorStack.Navigator>
              )}
              {!user?.role && (
                <View style={styles.loadingPage}>
                  <ActivityIndicator style={styles.loading} size='large' />
                </View>
              )}
            </>
          )}
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingPage: {
    height: '100%',
    padding: 60,
  },
});
