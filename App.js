/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView, StatusBar, Text, ActivityIndicator} from 'react-native';

import {Button} from 'react-native-elements';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ListItemSelectionModal from './src/list_item_selection_modal';
import {modalSelectionMode, selectionViewDirection} from './src/constants';


const data=['hello', 'how', 'are', 'you'];

class App extends React.Component<{}> {
    state = {
        isMultipleSelectionModalVisible: false,
        isSingleSelectionModalVisible: false,
        filteredData:data,
    };

    render() {
        return (
            <>
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}
                        contentContainerStyle={styles.container}>
                        <View style={{height: 25}}/>
                        <Button
                            title={'Multiple Selection'}
                            onPress={() => this.showMultipleSelectionModal(true)}
                        />
                        <View style={{height: 25}}/>
                        <Button
                            title={'Single Selection'}
                            onPress={() => this.showSingleSelectionModal(true)}
                        />
                        {this.renderModals()}
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }

    renderModals = () => {
        const filterByStartsWith = (query)=>data.filter(item=>item.toLowerCase().startsWith(query.toLowerCase()));

        return <View>
            <ListItemSelectionModal
                mode={modalSelectionMode.multiple}
                visible={this.state.isMultipleSelectionModalVisible}
                onRequestClose={() => this.showMultipleSelectionModal(false)}
                direction={selectionViewDirection.right}
                onRenderData={item => <View style={{flexDirection:"row", alignItems:"center"}}>
                    <ActivityIndicator style={{padding:8}}/>
                    <Text style={{color:"red"}}>{item}</Text>
                </View>}
                searchPlaceHolder={"sdkjfksjf"}
                searchTrailing={<ActivityIndicator/>}
                data={this.state.filteredData}
                onQuery={query=>this.setFilteredData(filterByStartsWith(query))}
                onSaved={finalItems=>console.log(finalItems)}
            />
            <ListItemSelectionModal
                mode={modalSelectionMode.single}
                visible={this.state.isSingleSelectionModalVisible}
                onRequestClose={() => this.showSingleSelectionModal(false)}
                direction={selectionViewDirection.left}
                onRenderData={item => <Text style={{color:"green"}}>{item}</Text>}
                data={this.state.filteredData}
                searchLeading={<ActivityIndicator/>}
                onQuery={query=>this.setFilteredData(filterByStartsWith(query))}
                onSaved={finalItems=>console.log(finalItems)}
            />
        </View>;
    };

    setFilteredData = (data) => {
        this.setState({filteredData:data});
    }

    showMultipleSelectionModal = (isVisible) => {
        this.setState({isMultipleSelectionModalVisible: isVisible});
    };

    showSingleSelectionModal = (isVisible) => {
        this.setState({
            isSingleSelectionModalVisible: isVisible,
        });
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 64,
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
