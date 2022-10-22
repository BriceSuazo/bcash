import { Platform, StatusBar } from 'react-native';

export const Color = {
  primary: '#2db85b',
  gray:"gray",
};

export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const paddingHorizontalContainer = 16;

export const REGEX_EMAIL_VALIDATION=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

export const homeScreenIcons = [
  { icon: 'send', navigate: 'SendPayment', text: 'Send' },
  { icon: 'download', navigate: '', text: 'Receive' },
  { icon: 'shopping-cart', navigate: '', text: 'Buy' },
  { icon: 'arrows-h', navigate: '', text: 'Swap' },
];

export const transactions = [
  { type: 'Transfer', to: 'LAZADA PH', amount: `₱20.00` },
  { type: 'Buy', to: '+639123456789', amount: `₱128.75` },
  { type: 'Swap', to: 'SHOPEE', amount: `₱54.50` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Transfer', to: 'LAZADA PH', amount: `₱20.00` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Buy', to: '+639123456789', amount: `₱128.75` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Swap', to: 'SHOPEE', amount: `₱54.50` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Buy', to: '+639123456789', amount: `₱128.75` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
  { type: 'Transfer', to: '+639123456789', amount: `₱658.32` },
];

export const notifications = [
  {
    icon: 'send',
    title: 'Transfered money',
    subtitle: '',
    date: '8:42 PM | October 21, 2022',
    isNew: true,
  },
  {
    icon: 'download',
    title: 'Multiple Wallet Features!',
    subtitle: '',
    date: '12:21 PM | October 21, 2022',
    isNew: false,
  },
  {
    icon: 'shield',
    title: 'Security Updates!',
    subtitle: '',
    date: '12:21 PM | October 21, 2022',
    isNew: false,
  },
  {
    icon: 'download',
    title: 'Multiple Wallet Features!',
    subtitle: '',
    date: '12:21 PM | October 21, 2022',
    isNew: false,
  },
];