import React from 'react';
import './login.less';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import {withRouter} from "react-router-dom";
import nprogressHoc from '../../components/nprogress/nprogress';
import axios from '../../config/httpClient';
import { CONSTANTS } from '../../utils/constant';
import Api from '../../utils/api';
import * as THREE from 'three';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: {
        loading: false,
        text: '登录'
      }
    }
  }

  componentDidMount() {
    var canvas = document.getElementById('webgl');
    // var canvas = document.createElement('canvas');
    // div.appendChild(canvas)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var gl = canvas.getContext('webgl');

    var vertexShaderSource = document.getElementById('vertexShader').innerText;

    var fragShaderSource = document.getElementById('fragmentShader').innerText;

    var program = initShader(gl, vertexShaderSource, fragShaderSource);

    var aposLocation = gl.getAttribLocation(program, 'position');
    var scale = gl.getAttribLocation(program, 'scale');

    var modelViewMatrixLoc = gl.getUniformLocation(program, 'modelViewMatrix');
    var projectionMatrixLoc = gl.getUniformLocation(program, 'projectionMatrix');




    var SEPARATION = 100,
      AMOUNTX = 50,
      AMOUNTY = 50;
    var numParticles = AMOUNTX * AMOUNTY;

    var positions = new Float32Array(numParticles * 3);
    var scales = new Float32Array(numParticles);

    var i = 0,
      j = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

      for (var iy = 0; iy < AMOUNTY; iy++) {

        positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z
        scales[j] = 1;
        i += 3;
        j++;

      }

    }

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, scales, gl.STATIC_DRAW);
    gl.vertexAttribPointer(scale, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(scale);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aposLocation);

    gl.enable(gl.DEPTH_TEST);

    var width = window.innerWidth; //
    var height = window.innerHeight; //
    var camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(200, 300, 200); //

    camera.position.set(944, 206, -262);
    camera.lookAt(new THREE.Vector3(0, 0, 0)); //()
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld(true)

    var mat4 = new THREE.Matrix4();
    mat4.copy(camera.projectionMatrix)

    var mxArr = new Float32Array(mat4.elements);

    gl.uniformMatrix4fv(projectionMatrixLoc, false, mxArr);

    var mat4y = new THREE.Matrix4();

    mat4y.copy(camera.matrixWorldInverse);

    var myArr = new Float32Array(mat4y.elements);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, myArr);


    var count = 0;
    var mouseX = 0;

    var windowHalfX = window.innerWidth / 2;

    function draw() {
      camera.position.x += (mouseX - camera.position.x) * 0.01;

      camera.updateMatrixWorld(true)
      mat4y.copy(camera.matrixWorldInverse);

      var myArr = new Float32Array(mat4y.elements);
      gl.uniformMatrix4fv(modelViewMatrixLoc, false, myArr);

      var i = 0,
        j = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          positions[i + 1] = (Math.sin((ix + count) * 0.3) * 50) +
            (Math.sin((iy + count) * 0.5) * 50);
          scales[j] = (Math.sin((ix + count) * 0.3) + 1.3) * 8 +
            (Math.sin((iy + count) * 0.5) + 1.3) * 8;
          i += 3;
          j++;
        }
      }
      count += 0.1;

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, scales, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      requestAnimationFrame(draw);

      gl.drawArrays(gl.POINTS, 0, 2500);
    }
    draw();



    function initShader(gl, vertexShaderSource, fragmentShaderSource) {
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      gl.compileShader(vertexShader);
      gl.compileShader(fragmentShader);
      var program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);
      return program;
    }

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    function onDocumentMouseMove(event) {

      mouseX = event.clientX - windowHalfX;

    }

    function onDocumentTouchStart(event) {

      if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;

      }

    }

    function onDocumentTouchMove(event) {

      if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;

      }

    }
    window.onresize = function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      mat4.copy(camera.projectionMatrix)
      var mxArr = new Float32Array(mat4.elements);
      gl.uniformMatrix4fv(projectionMatrixLoc, false, mxArr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
  }

  handleSubmit = e => {
      e.preventDefault();
      this.setState({
        submit: {
          loading: true,
          text: '登录中...'
        }
      });
      this.props.form.validateFields((err, values) => {
        if (!err) {
          axios.post(Api.userLogin, {
          userName: values.username,
          userPsw: values.password
          }).then(rsp => {
            this.setState({
              submit: {
                loading: false,
                text: '登录'
              }
            });
            const urlBeforeLogin = localStorage.getItem(CONSTANTS.REDIRECT_URL);
            if (urlBeforeLogin) {
              this.props.history.push(urlBeforeLogin)
            } else {
              this.props.history.push('/');
            }
          }).catch(err => {
            this.setState({
              submit: {
                loading: false,
                text: '登录'
              }
            });
          });
        } else {
          this.setState({
            submit: {
              loading: false,
              text: '登录'
            }
          });
        }
      });
    };
    
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="login-container">
          <div className="threejs">
            <canvas id="webgl"></canvas>
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="login-title">记账本</div>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名!" }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a className="login-form-forgot" href="null">
                忘记密码
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.submit.loading}
              >
                {this.state.submit.text}
              </Button>
              或者 <a href="null">前往注册!</a>
            </Form.Item>
          </Form>
        </div>
      );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default nprogressHoc(withRouter(WrappedNormalLoginForm));