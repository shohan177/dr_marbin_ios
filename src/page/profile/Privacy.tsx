import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { ScrollView } from "react-native-gesture-handler";
import CustomeHead from "../../component/CustomeHead";
import Container from "../../component/container/Container";

const Privacy = () => {
  return (
    <Container>
      <CustomeHead title="Privacy & Policy" />
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ color: "#000", margin: 10, padding: 10 }}>
          <Text style={styles.heading}>
            MegaNegociosUS.com Privacy (Last updated January 2, 2015)
          </Text>
          {"\n\n"}
          <Text style={styles.sectionHeading}>Terms of Use</Text>
          {"\n"}
          <Text style={styles.paragraph}>
            This policy details how data about you is collected/used/disclosed
            when you visit our websites and services or otherwise interact with
            us. If we update it, we will revise the date, place notices on
            MegabusinessUSA.com/MegabusinessUSA.com/MegaNegociosUSA.com/MegaNegociosUS.com
            if a change is material, and/or obtain your consent as required by
            law.
          </Text>
          {"\n\n"}

          <Text style={styles.sectionHeading}>1. Protecting your privacy</Text>
          {"\n"}
          <Text style={styles.paragraph}>
            We take precautions to prevent unauthorized access to or misuse of
            data about you. We do not run ads, other than classified ads posted
            by our users. We do not share your data with third parties for
            marketing purposes. We do not engage in cross-marketing or
            link-referral programs with other sites. We do not employ tracking
            devices for marketing purposes. We do not send you unsolicited
            communications for marketing purposes. We do not engage in affiliate
            marketing (and prohibit it on
            MegabusinessUSA.com/MegabusinessUSA.com/MegaNegociosUSA.com/MegaNegociosUS.com).
            We do provide email proxy & relay to reduce unwanted mail.
            MegaNegociosUS.com links to third party sites – please review their
            privacy policies.
          </Text>
          {"\n\n"}

          <Text style={styles.sectionHeading}>
            2. Data we use to provide/improve our services and/or combat
            fraud/abuse
          </Text>
          {"\n"}
          <Text style={styles.paragraph}>
            data you post on
            MegabusinessUSA.com/MegabusinessUSA.com/MegaNegociosUSA.com/MegaNegociosUS.com,
            or send us directly or via other sites. Please do not post private
            data. credit card data, which is transmitted to payment processors
            via a security protocol (e.g. SSL). data you provide (e.g. email
            address, name, address, phone, fax, photos, tax ID). web log data
            (e.g. pages viewed, access times, IP address, HTTP headers). data
            collected via cookies (e.g. keyword searches and “favorites” lists).
            data about your devices (e.g. screen size, DOM local storage,
            plugins). data from 3rd parties (e.g. phone type, general location
            derived from IP address).
          </Text>
          {"\n\n"}

          <Text style={styles.sectionHeading}>3. Data we store</Text>
          {"\n"}
          <Text style={styles.paragraph}>
            We retain data as long as needed for our business purposes and/or as
            required by law. We make good faith efforts to store data securely,
            but make no guarantees. You may access and update certain data about
            you by logging into your account.
          </Text>
          {"\n\n"}

          <Text style={styles.sectionHeading}>
            4. Circumstances in which we may disclose user data
          </Text>
          {"\n"}
          <Text style={styles.paragraph}>
            to vendors and service providers (e.g. payment processors) working
            on our behalf. to respond to subpoenas, court orders, or other legal
            process. to protect our rights, property, or safety, or that of our
            users or the general public. with your consent (e.g. if you
            authorize us to share data with other users). in connection with a
            merger, bankruptcy, or sale/transfer of assets to another company.
            in aggregate or summary form, as long as it cannot reasonably be
            used to identify you. International Users – By visiting
            MegabusinessUSA.com/MegabusinessUSA.com/MegaNegociosUSA.com/MegaNegociosUS.com
            or providing us data, you agree we may use and disclose data we
            collect for purposes listed here or as communicated to you, transmit
            it outside your resident jurisdiction, and store it on servers in
            the United States. For more information please contact us
            :sublimeinc@sbcglobal.net .
          </Text>
          {"\n\n"}
        </Text>
      </ScrollView>
    </Container>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "justify",
    marginBottom: 10,
    color: "#000",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
    marginVertical: 10,
  },
  paragraph: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
    color: "#333",
  },
});
