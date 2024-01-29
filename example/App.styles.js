import {StyleSheet} from 'react-native';
import {constants} from 'react-native-floating-action-menu';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 21,
  },
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  body: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#0000ff99',
  },
  numberStepperContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 21,
    marginTop: 7,
    marginBottom: 21,
    width: '100%',
  },

  colorOptionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 18,
    paddingRight: 10,
  },
  colorOptionsInner: {
    width: '100%',
    marginBottom: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  easingOptionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 18,
    paddingRight: 10,
    width: '100%',
    height: 500,
  },

  positionOptionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 18,
    paddingRight: 10,
  },
  positionOptionsInner: {
    width: '100%',
    marginBottom: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  swatch: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  positionOption: {
    height: 36,
    lineHeight: 22,
    padding: 4,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 10,
  },

  positionActive: {
    borderColor: constants.Colors.secondaryColor,
  },

  addIcon: {
    width: '80%',
    height: '80%',
  },
});

export default styles;
