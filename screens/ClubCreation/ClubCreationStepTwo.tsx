import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ClubCreationStepTwoScreenProps } from "../../types/club";

const Container = styled.ScrollView`
  flex: 1;
`;
const HeaderView = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const H1 = styled.Text`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 15px;
`;

const H2 = styled.Text`
  font-size: 18px;
  color: #5c5c5c;
  margin-bottom: 20px;
`;

const ImagePickerView = styled.View`
  width: 100%;
  align-items: center;
`;

const ImagePickerButton = styled.TouchableOpacity<{ height: number }>`
  width: 80%;
  border-radius: 10px;
  height: ${(props) => props.height}px;
  justify-content: center;
  align-items: center;
  background-color: #c4c4c4;
`;

const ImagePickerText = styled.Text`
  font-size: 21px;
  font-weight: 600;
  color: #2995fa;
`;

const PickedImage = styled.Image<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height}px;
  border-radius: 10px;
`;

const SectionView = styled.View`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const FieldView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
  margin-top: 30px;
`;

const FieldContentView = styled.View`
  margin-left: 15px;
`;
const FieldContentLine = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const FieldNameText = styled.Text`
  font-size: 21px;
  font-weight: 700;
  margin-right: 15px;
`;

const FieldContentText = styled.Text`
  font-size: 18px;
  margin-right: 10px;
`;

const FieldInput = styled.TextInput`
  height: 40px;
  border-radius: 5px;
  background-color: #f3f3f3;
  font-size: 15px;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const NextButton = styled.TouchableOpacity`
  width: 200px;
  height: 40px;
  background-color: #295af5;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 80px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

const ClubCreationStepTwo: React.FC<ClubCreationStepTwoScreenProps> = ({
  route: {
    params: { category1, category2 },
  },
  navigation: { navigate },
}) => {
  const [clubName, setClubName] = useState<string>("");
  const [clubMemberCount, setClubMemberCount] = useState<number>(0);
  const [limitCheck, setLimitCheck] = useState<boolean>(false);
  const [approvalMethod, setApprovalMethod] = useState<number>(0);
  const [imageURI, setImageURI] = useState<string | null>(null);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const imageHeight = Math.floor(((SCREEN_WIDTH * 0.8) / 16) * 9);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (result.cancelled === false) {
      setImageURI(result.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HeaderView>
          <H1>?????? ?????? / ??????</H1>
          <H2>?????? ????????? ????????? ???????????????.</H2>
        </HeaderView>

        <ImagePickerView>
          <ImagePickerButton
            height={imageHeight}
            onPress={pickImage}
            activeOpacity={0.8}
          >
            {imageURI ? (
              <PickedImage height={imageHeight} source={{ uri: imageURI }} />
            ) : (
              <ImagePickerText>?????? ?????? ??????</ImagePickerText>
            )}
          </ImagePickerButton>
        </ImagePickerView>

        <SectionView>
          <FieldView>
            <FieldNameText>?????? ??????</FieldNameText>
            <FieldContentView>
              <FieldInput
                clearButtonMode="always"
                placeholder="????????? 10??? ?????? (???????????? ??????)"
                style={{ width: 200 }}
                textAlign="center"
                maxLength={10}
                onChangeText={(name) => setClubName(name)}
                returnKeyType="done"
                returnKeyLabel="done" // for Android
              />
            </FieldContentView>
          </FieldView>
          <FieldView>
            <FieldNameText>?????? ??????</FieldNameText>
            <FieldContentView>
              <FieldContentLine>
                <FieldContentText>??????</FieldContentText>
                <FieldInput
                  keyboardType="numeric"
                  editable={!limitCheck}
                  defaultValue={limitCheck ? "???" : ""}
                  placeholder="???????????? ?????? ???"
                  style={{ width: 100 }}
                  textAlign="center"
                  maxLength={2}
                  onChangeText={(count) => setClubMemberCount(Number(count))}
                  returnKeyType="done"
                  returnKeyLabel="done" // for Android
                />
                <FieldContentText> ???</FieldContentText>
              </FieldContentLine>
              <FieldContentLine>
                <Button
                  onPress={() => {
                    if (!limitCheck) setClubMemberCount(-1);
                    setLimitCheck(!limitCheck);
                  }}
                  activeOpacity={0.5}
                >
                  <FieldContentText>?????? ??? ??????????????? ??????</FieldContentText>
                  {limitCheck ? (
                    <MaterialCommunityIcons
                      name="checkbox-marked-outline"
                      size={20}
                      color="black"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      size={20}
                      color="black"
                    />
                  )}
                </Button>
              </FieldContentLine>
            </FieldContentView>
          </FieldView>
          <FieldView>
            <FieldNameText>?????? ??????</FieldNameText>
            <FieldContentView>
              <FieldContentLine>
                <Button
                  onPress={() => setApprovalMethod(0)}
                  activeOpacity={0.5}
                >
                  {approvalMethod ? (
                    <MaterialCommunityIcons
                      name="radiobox-blank"
                      size={20}
                      color="black"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="radiobox-marked"
                      size={20}
                      color="black"
                    />
                  )}
                  <FieldContentText> ????????? ?????? ??????</FieldContentText>
                </Button>
              </FieldContentLine>
              <FieldContentLine>
                <Button
                  onPress={() => setApprovalMethod(1)}
                  activeOpacity={0.5}
                >
                  {approvalMethod ? (
                    <MaterialCommunityIcons
                      name="radiobox-marked"
                      size={20}
                      color="black"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="radiobox-blank"
                      size={20}
                      color="black"
                    />
                  )}
                  <FieldContentText> ????????? ?????? ??? ??????</FieldContentText>
                </Button>
              </FieldContentLine>
            </FieldContentView>
          </FieldView>
        </SectionView>
        <NextButton
          onPress={() => {
            if (clubName === "") {
              return Alert.alert("?????? ????????? ???????????????.");
            } else if (!limitCheck && clubMemberCount < 1) {
              return Alert.alert("?????? ????????? ?????? 1??? ??????????????? ?????????.");
            } else if (imageURI === null) {
              return Alert.alert("?????? ???????????? ??????????????????.");
            } else {
              return navigate("ClubCreationStepThree", {
                category1,
                category2,
                clubName,
                clubMemberCount,
                approvalMethod,
                imageURI,
              });
            }
          }}
        >
          <ButtonText>?????? 2/3</ButtonText>
        </NextButton>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default ClubCreationStepTwo;
