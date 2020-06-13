import {Modal, Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Button, CheckBox} from 'react-native-elements';
import {modalSelectionMode, selectionViewDirection} from './constants';

export default function ListItemSelectionModal(
    {
        visible, mode, data, direction,
        searchLeading, searchTrailing, searchPlaceHolder, searchInitialValue, searchContainerStyle,
        onRenderData, onQuery, onSaved, onRequestClose,
    }) {
    const [selection, updateSelection] = useState([]);
    if (!searchContainerStyle) {
        searchContainerStyle = {borderWidth: 1, borderRadius: 5, padding: 8};
    }
    return <Modal
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View
                    style={{flexDirection: 'row', ...searchContainerStyle}}
                >
                    {searchLeading}
                    <TextInput
                        placeholder={searchPlaceHolder ? searchPlaceHolder : 'Search'}
                        onChangeText={query => onQuery(query, data)}
                        style={{padding: 0, flex: 1}}
                    />
                    {searchTrailing}
                </View>
                <CheckList
                    data={data}
                    selectedItems={selection}
                    onUpdate={updateSelection}
                    onRenderData={onRenderData}
                    mode={mode}
                    direction={direction}
                />
                <View style={{flexDirection: 'row'}}>
                    <Button buttonStyle={styles.saveButton} title={'Save'} onPress={() => {
                        onSaved(selection);
                        onRequestClose();
                    }}/>
                    <View style={{flex: 1}}/>
                    <Button buttonStyle={styles.saveButton} title={'close'} onPress={onRequestClose}/>
                </View>
            </View>
        </View>
    </Modal>;
}


function CheckList({data: dataList, selectedItems, onUpdate, onRenderData, mode, direction}) {
    let isSingleSelection = mode === modalSelectionMode.single;
    let checkIcon = isSingleSelection ? 'dot-circle-o' : undefined;
    let uncheckedIcon = isSingleSelection ? 'circle-o' : undefined;

    const onSelect = (item) => {
        let isSelected = selectedItems.includes(item);
        let updatedSelection = new Set(selectedItems);
        if (isSingleSelection) {
            if (!isSelected) {
                onUpdate([item]);
            }
        } else {
            if (!isSelected) {
                updatedSelection.add(item);
            } else {
                updatedSelection.delete(item);
            }
            onUpdate([...updatedSelection]);
        }
    };

    return (
        <View>
            {dataList.map(
                data => {
                    let isSelected = selectedItems.includes(data);
                    let isRight = direction === selectionViewDirection.right;
                    let containerStyle = isRight ? {
                        ...styles.row,
                        paddingLeft: 8,
                        justifyContent: 'space-between',
                    } : {...styles.row, paddingRight: 8};
                    return <TouchableOpacity style={containerStyle} onPress={() => onSelect(data)}>
                        {isRight ? onRenderData(data) : undefined}
                        <CheckBox
                            checked={isSelected}
                            checkedIcon={checkIcon}
                            uncheckedIcon={uncheckedIcon}
                            iconRight={isRight}
                            containerStyle={styles.checkBoxStyle}
                            onPress={() => onSelect(data)}
                        />
                        {direction === selectionViewDirection.left ? onRenderData(data) : undefined}
                    </TouchableOpacity>;
                },
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {flex: 1},
    row: {flexDirection: 'row', alignItems: 'center'},
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    centeredView: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'},
    titleText: {fontSize: 24, textAlign: 'center', padding: 16},
    checkBoxStyle: {backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', margin: 0, paddingHorizontal: 0},
    saveButton: {
        alignSelf: 'baseline',
        paddingHorizontal: 32,
        marginTop: 32,
        borderRadius: 8,
    },
});

